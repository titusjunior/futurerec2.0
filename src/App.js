import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "./App.css";
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect, useState } from 'react';
import * as helper from './helperfunctions';

import TeacherComponent from './Components/TeacherComponent';
import ClassComponent from './Components/ClassCompnent';

import config from './aws-exports';

Amplify.configure(config);

function App({ signOut, user }) {

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [displayClasses, setDisplayClasses] = useState(false);
  const [classes, setClasses] = useState([]);
  
  const [selectedClass, setSelectedClass] = useState(null);
  const [newClassSubject, setNewClassSubject] = useState('');
  
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClassStanding, setNewStudentClassStanding] = useState('');
  
  const [allGradeDescriptions,setAllGradeDescriptions] = useState([]);
  const [newGradeDescription, setNewGradeDescription] = useState('');
  const [editedGrade, setEditedGrade] = useState(null);
  const [newGradeScore, setNewGradeScore] = useState('');





  const handleBackToTeachersClick = () => {
    setSelectedTeacher(null);
    setClasses([]);
    setDisplayClasses(false);
  };

  const handleClassClick = async (classId) => {
    try {
      const classInfo = await helper.getClass(classId);
      setSelectedClass(classInfo);
      setStudents([]); // Clear the list of students when a class is clicked
      const studentList = await helper.getStudentsForClass(classId);
      setStudents(studentList);

      setAllGradeDescriptions([]);//Clear the list of grade descriptions
      const gradeDescriptions = await helper.getUniqueGradeDescriptionsForClass(studentList);
      setAllGradeDescriptions(gradeDescriptions); 

       // Fetch and set grades for each student
    const studentsWithGrades = await Promise.all(
      studentList.map(async (student) => {
        const grades = await helper.getListOfGradesForStudent(student.id);
        return { ...student, grades };
      })
    );
    setStudents(studentsWithGrades);
      
      console.log("Grade Descriptions: ",allGradeDescriptions);
      console.log("Classes: ", classes);
      console.log("Class ID: ", classId);
      console.log("students: ", studentsWithGrades);
      console.log("Class: ", classInfo);
    } catch (error) {
      console.error("Error handling class click:", error);
    }
  };
  

  const handleBackToClassesClick = () => {
    setSelectedClass(null);
    setStudents([]); // Clear the list of students when going back to the list of classes
  };

  const handleAddClass = async () => {
    try {
      const newClass = await helper.addClass(newClassSubject, selectedTeacher.id);
      setClasses(prevClasses => [...prevClasses, newClass]);
      setNewClassSubject('');
    } catch (error) {
      console.error("Error adding new class:", error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const newStudent = await helper.addStudent(newStudentName, newStudentClassStanding);
      setStudents(prevStudents => [...prevStudents, newStudent]);
      await helper.associateStudentWithClass(selectedClass.id, newStudent.id);

      // Add a new grade for each student with score 0 and the new grade description
      //if a new student is added and there is already existing grade descrip
      allGradeDescriptions.forEach(async (gradeDescription) => {
        await helper.addGrade(newStudent.id, gradeDescription, 0);
      });
      
      setNewStudentName('');
      setNewStudentClassStanding('');
    } catch (error) {
      console.error("Error adding new student:", error);
    }
  };

  const handleAddGradeDescription = async () => {
    try {
      // Update the local state first
     setAllGradeDescriptions(prevGradeDescriptions => [...prevGradeDescriptions, newGradeDescription]);

      // Add the new grade description for each student
      students.forEach(async (student) => {
        await helper.addGrade(student.id, newGradeDescription, 0);
      });

      setNewGradeDescription('');
      console.log("Descriptions: ", allGradeDescriptions)
    } catch (error) {
      console.error("Error adding new grade description:", error);
    }
  };

  const handleScoreButtonClick = (studentId, gradeId, gradeDescription, score) => {
    setEditedGrade({ studentId, gradeId, gradeDescription });
    console.log(`GradeID: ${gradeId} Score ${score} clicked for student ${studentId} - ${gradeDescription}`);
  };

  const handleScoreInputChange = (event) => {
    setNewGradeScore(event.target.value);
  };

  const handleScoreInputKeyDown = async (event) => {
    if (event.key === 'Enter') {
      try {
        handleGradeUpdate();
        console.log("Grade Updated");
      } catch (error) {
        console.error("Error updating grade:", error);
      }
    }
  };

  const handleGradeUpdate = async () => {
    try {
      await helper.updateGrade(editedGrade.gradeId, editedGrade.gradeDescription, newGradeScore);
      setEditedGrade(null);
      setNewGradeScore('');
  
      // Update the grade in the state
      setStudents(prevStudents => {
        return prevStudents.map(student => {
          if (student.id === editedGrade.studentId) {
            // Find the index of the updated grade in the student's grades array
            const updatedGradeIndex = student.grades.findIndex(grade => grade.id === editedGrade.gradeId);
            if (updatedGradeIndex !== -1) {
              // Create a new array of grades with the updated score
              const updatedGrades = [...student.grades];
              updatedGrades[updatedGradeIndex] = { ...updatedGrades[updatedGradeIndex], score: newGradeScore };
              // Return the updated student object with the new grades array
              return { ...student, grades: updatedGrades };
            }
          }
          // Return the unchanged student object if it's not the one being updated
          return student;
        });
      });
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };
  
  return (
    <>
      <div>
        <h1>Hello {user.username}</h1>
        {!displayClasses && (
          <TeacherComponent 
          setSelectedTeacher={setSelectedTeacher} 
          setClasses={setClasses} 
          setDisplayClasses={setDisplayClasses} 
          classes={classes}
        />
        )}
        {selectedTeacher && displayClasses && (
          <ClassComponent 
          setDisplayClasses={setDisplayClasses}
          setSelectedTeacher={setSelectedTeacher}
          selectedTeacher = {selectedTeacher}
          setSelectedClass = {setSelectedClass}
          setStudents = {setStudents}
          allGradeDescriptions = {allGradeDescriptions}
          setAllGradeDescriptions = {setAllGradeDescriptions}
          classes={classes}
          setClasses={setClasses}
          />
        )}
        {selectedClass && (
          <>
            <h2>Students in {selectedClass && selectedClass.subject}:</h2>
            <button onClick={handleBackToClassesClick}>Back to Classes</button>
            <table>
              <thead>
                <tr>
                  <th>Student name</th>
                  <th>Class standing</th>
                  {/* Render grade descriptions */}
                  {allGradeDescriptions.map(gradeDescription => (
                    <th key={gradeDescription}>{gradeDescription}</th>
                  ))}
                  <th>
                  <input
                    type="text"
                    placeholder="Grade description"
                    value={newGradeDescription}
                    onChange={(e) => setNewGradeDescription(e.target.value)}
                  />
                  <button onClick={handleAddGradeDescription}>Add Description</button>
                </th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student && student.name}</td>
                    <td>{student && student.classStanding}</td>
                    {allGradeDescriptions.map(gradeDescription => {
                      const grade = Array.isArray(student.grades) ? student.grades.find(grade => grade && grade.description === gradeDescription) : null;
                      return (
                        <td key={`${student.id}-${gradeDescription}`}>
                          {editedGrade && editedGrade.studentId === student.id && editedGrade.gradeDescription === gradeDescription ? (
                            <input
                              className="short-input" 
                              type="number"
                              value={newGradeScore}
                              onChange={handleScoreInputChange}
                              onKeyDown={handleScoreInputKeyDown}
                            />
                          ) : (
                            <button className='grade-button' onClick={() => handleScoreButtonClick(student.id, grade ? grade.id : null, gradeDescription, grade ? grade.score : null)}>
                              {grade ? grade.score : '-'}
                            </button>
                          )}
                        </td>
                      );
                    })}

                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <input
                type="text"
                placeholder="Student Name"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Class Standing"
                value={newStudentClassStanding}
                onChange={(e) => setNewStudentClassStanding(e.target.value)}
              />
              <button onClick={handleAddStudent}>Add Student</button>
            </div>
            
          </>
        )}

        <button onClick={signOut}>Sign out</button>
      </div>
    </>
  );
}

export default withAuthenticator(App);
