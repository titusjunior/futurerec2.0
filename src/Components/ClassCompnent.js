import React, { useState, useEffect } from 'react';
import * as helper from './helperfunctions';
import "../App.css";


function ClassComponent({setDisplayClasses, setSelectedTeacher, selectedTeacher, setSelectedClass, selectedClass, setStudents, allGradeDescriptions, setAllGradeDescriptions, classes, setClasses}){
  

  const [newClassSubject, setNewClassSubject] = useState('');
  
  const handleClassClick = async (classId) => {

    if (selectedClass && selectedClass.id === classId) {
      // If the clicked class is the same as the currently selected class, do nothing
      return;
    }

    //console.log("Class Clicked", classId);

    console.log("Class Component 1");
   
    try {
      const classInfo = await helper.getClass(classId);
     // console.log("Class Clicked", classInfo);
      setSelectedClass(classInfo);
      setStudents([]); // Clear the list of students when a class is clicked
      const studentList = await helper.getStudentsForClass(classId);
      setStudents(studentList);


      console.log("Class Component 2");



    //  console.log("Class Component: Fetching Grades for", studentList);
      setAllGradeDescriptions([]);//Clear the list of grade descriptions
      const gradeDescriptions = await helper.getUniqueGradeDescriptionsForClass(classId, studentList);
      setAllGradeDescriptions(gradeDescriptions); 



      console.log("Class Component 3");


       // Fetch and set grades for each student
      const studentsWithGrades = await Promise.all(
      studentList.map(async (student) => {
        const grades = await helper.getListOfGradesForStudent(classId, student.id);
        return { ...student, grades };
      })
      );
      setStudents(studentsWithGrades);

      console.log("Class Component 4");

      //console.log("students: ", studentsWithGrades);
     /* console.log("Grade Descriptions: ",allGradeDescriptions);
      console.log("Classes: ", classes);
      console.log("Class ID: ", classId);
      console.log("Class: ", classInfo);*/
    } catch (error) {
      console.error("Error handling class click:", error);
    }
  };

  const handleAddClass = async () => {
    try {

      //Prevent User from entering a blank class
      if (newClassSubject.trim() === '') {
        console.log("Please enter a valid Class Name.");
        return;
      }

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
      </div>
    </>
  );
}

export default ClassComponent;