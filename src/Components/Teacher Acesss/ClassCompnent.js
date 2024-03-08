import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import "../../App.css";

function ClassComponent({setDisplayTeacher, setDisplayClasses, setDisplayStudents, setSelectedTeacher, selectedTeacher, setSelectedClass, selectedClass, setStudents, allGradeDescriptionsAndWeights, setAllGradeDescriptionsAndWeights, classes, setClasses}){
  const [newClassSubject, setNewClassSubject] = useState('');
  const [classErrorMessage, setClassErrorMessage] = useState('');
  
  const handleClassClick = async (classId) => {
    if (selectedClass && selectedClass.id === classId) {
      // If the clicked class is the same as the currently selected class, do nothing
      return;
    }

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

      setDisplayStudents(true);
      setDisplayClasses(false);

    } catch (error) {
      console.error("Error handling class click:", error);
    }
  };

  const handleAddClass = async () => {
    try {
      //Prevent User from entering a blank class
      if (newClassSubject.trim() === '') {
        setClassErrorMessage("Cannot add a blank subject");
        console.log("Please enter a valid Class Name.");
        return;
      }
      setClassErrorMessage('');
      const newClass = await helper.addClass(newClassSubject, selectedTeacher.id);
      setClasses(prevClasses => [...prevClasses, newClass]);
      setNewClassSubject('');
    } catch (error) {
      console.error("Error adding new class:", error);
    }
  };

  const handleBackToTeachersClick = () => {
    setSelectedTeacher(null);
    setClasses([]);
    setDisplayClasses(false);
    setDisplayTeacher(true);
  };

  return(
    <>
      <h2>Classes for {selectedTeacher && selectedTeacher.name}:</h2> {/* Added null check for selectedTeacher */}
      <button className='student-button' onClick={handleBackToTeachersClick}>Back to Teachers</button>
      <div>
        {classes.map(classItem => (
          <div key={classItem.id}>
            <button onClick={() => handleClassClick(classItem.id)}>
              {classItem && classItem.subject} {/* Added null check for classItem */}
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter class name"
          value={newClassSubject}
          onChange={(e) => setNewClassSubject(e.target.value)}
        />
        <button className='student-button' onClick={handleAddClass}>Add Class</button>
        {classErrorMessage && <p className="error-message">{classErrorMessage}</p>}
      </div>
    </>
  );
}

export default ClassComponent;