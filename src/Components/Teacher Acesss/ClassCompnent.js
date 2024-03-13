import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import "../../App.css";

function ClassComponent({setDisplayClasses, teacherId, setSelectedClass, setStudents, setAllGradeDescriptionsAndWeights}){
  const [classes, setClasses] = useState([]);
  
  useEffect(() => {
    const fetchClasses = async () => {
      try { 
        const classList = await helper.getListOfClassesForTeacher(teacherId);
        if (classList) {
          const sortedClasses = classList.sort((a, b) => a.subject.localeCompare(b.subject))
          setClasses(sortedClasses);
          console.log(" sorted classes: ",sortedClasses);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }  
    };
  
    fetchClasses();
  }, []);

  const handleClassClick = async (classId) => {
     try {
      const classInfo = await helper.getClass(classId);
      setSelectedClass(classInfo);
      setStudents([]); // Clear the list of students when a class is clicked
      const studentList = await helper.getStudentsForClass(classId);
      setStudents(studentList);
      setAllGradeDescriptionsAndWeights([]);//Clear the list of grade descriptions
      let gradeDescriptionsAndWeights = [];
      if (studentList.length > 0) {
        gradeDescriptionsAndWeights = await helper.getUniqueGradeDescriptionsAndWeightForClass(classId, studentList[0].id);
      }   
      setAllGradeDescriptionsAndWeights(gradeDescriptionsAndWeights);    

       // Fetch and set grades for each student
      const studentsWithGrades = await Promise.all(
      studentList.map(async (student) => {
        const grades = await helper.getListOfGradesForStudent(classId, student.id);
        return { ...student, grades };
      }));
      setStudents(studentsWithGrades);
      setDisplayClasses(false);
    } catch (error) {
      console.error("Error handling class click:", error);
    }
  };

  
  return(
    <>
      <h2>Classes:</h2> {/* Added null check for selectedTeacher */}
      <div className = "classItems">
        {classes.map(classItem => (
          <div key={classItem.id}>
            <button style = {{marginLeft: '50px' }} onClick={() => handleClassClick(classItem.id)}>
              {classItem && classItem.subject} {/* Added null check for classItem */}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ClassComponent;