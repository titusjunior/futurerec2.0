import React, { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import * as helper from '../helperfunctions';
import "../../App.css";

function ClassComponent({studentId, setGrades, classes, setClasses, setSelectedClass, setDisplayGrades}){

  useEffect(() => {
    const fetchClassesForStudent = async () => {
      try {
        const studentId = await fetchUserAttributes();
        console.log(studentId.sub);
        const classesList = await helper.getClassesForStudent(studentId.sub);
            console.log("Classes of student", classesList);
            const sortedClasses = classesList.sort((a, b) => a.subject.localeCompare(b.subject));
            setClasses(sortedClasses);
            console.log("Sorted classes of student", sortedClasses);
      } catch (error) {
        console.error("Error fetching Classes:", error);
      }
    };

    fetchClassesForStudent();
  }, []);


  const handleClassClick = async (classId) => {

    try {
      const studentId = await fetchUserAttributes();
      const classInfo = await helper.getClass(classId);
      setSelectedClass(classInfo);      
      const StudentGrades = await helper.getListOfGradesForStudent(classId, studentId.sub);
      setGrades(StudentGrades);
      setDisplayGrades(true);
    } catch (error) {
      console.error("Error handling class click:", error);
    }
  };


  return(
    <>
      <h2>Currently Enrolled For:</h2> {/* Added null check for selectedTeacher */}
      <div className="classItems">
        {classes.map(classItem => (
          <div key={classItem.id}>
            <button onClick={() => handleClassClick(classItem.id)}>
              {classItem && classItem.subject} {/* Added null check for classItem */}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ClassComponent;