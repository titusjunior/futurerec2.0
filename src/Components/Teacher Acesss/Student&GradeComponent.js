import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import "../../App.css";
import Career from  "../Student Acess/CareersDeterminer"

function StudentComponent({setDisplayStudents, setDisplayClasses, selectedClass, setSelectedClass, students, setStudents, allGradeDescriptions, setAllGradeDescriptions }) {
    
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClassStanding, setNewStudentClassStanding] = useState('');
  const [isExistingStudentSelected, setIsExistingStudentSelected] = useState(false);
        
  const [newGradeDescription, setNewGradeDescription] = useState('');
  const [editedGrade, setEditedGrade] = useState(null);
  const [newGradeScore, setNewGradeScore] = useState('');

  const ClassStandings = ["Freshman", "Sophmore", "Junior", "Senior"];

  useEffect(() => {
    const fetchAvailableStudents = async () => {
      try {
        if (selectedClass) {
          const studentsInClass = await helper.getStudentsForClass(selectedClass.id);
          const allStudents = await helper.getListOfAllStudents();
          const studentsNotInClass = allStudents.filter(student => !studentsInClass.some(({ id }) => id === student.id));
          setAvailableStudents(studentsNotInClass);
        }
      } catch (error) {
        console.error("Error fetching available students:", error);
      }
    };


    fetchAvailableStudents();
  }, [selectedClass]);
        

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedStudentId(value);
    setNewStudentName('');
    setIsExistingStudentSelected(!!value); // Convert value to boolean and set state
  };
    
  const handleBackToClassesClick = () => {
    setSelectedClass(null);
    setStudents([]); // Clear the list of students when going back to the list of classes
    setDisplayClasses(true);
    setDisplayStudents(false);
  };
  
  const handleAddStudent = async () => {
    try {
      //Prevent User from entering a blank Student
      if (!selectedStudentId && (newStudentName.trim() === '' || newStudentClassStanding.trim() === '')) {
        console.log("Please enter a valid Student.");
        return;
      }


      if (selectedStudentId) {
        await helper.associateStudentWithClass(selectedClass.id, selectedStudentId);
        const addedStudent = availableStudents.find(student => student.id === selectedStudentId);
        setStudents([...students, addedStudent]);
        setAvailableStudents(availableStudents.filter(student => student.id !== selectedStudentId));
        //set initial score for all test already in class
        allGradeDescriptions.forEach(async (gradeDescription) => {
          await helper.addGrade(selectedClass.id, selectedStudentId, gradeDescription, 0);
        });
      } else if (newStudentName.trim() !== '') {
        const newStudent = await helper.addStudent(newStudentName, newStudentClassStanding);
        setStudents([...students, newStudent]);
        await helper.associateStudentWithClass(selectedClass.id, newStudent.id);

        allGradeDescriptions.forEach(async (gradeDescription) => {
          await helper.addGrade(selectedClass.id, newStudent.id, gradeDescription, 0);
        });

      }
      setSelectedStudentId('');
      setNewStudentName('');
      setNewStudentClassStanding('');
      setIsExistingStudentSelected(false); // Reset state after adding student
    } catch (error) {
      console.error("Error adding new student:", error);
    }
  };
  
  const handleAddGradeDescription = async () => {
    try {
      //Prevent User from entering a blank description
      if (newGradeDescription.trim() === '') {
        console.log("Please enter a valid grade description.");
        return;
      }

      // Check if the new grade description already exists
      if (allGradeDescriptions.includes(newGradeDescription)) {
        console.log("Grade description already exists.");
        setNewGradeDescription('');
        return;
      }

      // Update the local state first
      setAllGradeDescriptions(prevGradeDescriptions => [...prevGradeDescriptions, newGradeDescription]);
  
      // Add the new grade description for each student
      students.forEach(async (student) => {
        await helper.addGrade(selectedClass.id, student.id, newGradeDescription, 0);
      });
  
      setNewGradeDescription('');
    } catch (error) {
      console.error("Error adding new grade description:", error);
    }
  };
  
  const handleScoreButtonClick = (studentId, gradeId, gradeDescription, score) => {
    setEditedGrade({ studentId, gradeId, gradeDescription });
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


  return(
    <>

    {/*For Testing Purposes */}
    <Career/>

    {/*For Testing Purposes */}

      <h2>Students in {selectedClass && selectedClass.subject}:</h2>
        <button className='student-button' onClick={handleBackToClassesClick}>Back to Classes</button>
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
                <button className='student-button' onClick={handleAddGradeDescription}>Add Description</button>
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
            
        <h2>Add Student:</h2>
        <div>
          <select value={selectedStudentId} onChange={handleSelectChange}>
            <option value="">Select existing student</option>
            {availableStudents.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          {!isExistingStudentSelected && (
            <>
              <input
                type="text"
                placeholder="Or enter new student name"
                value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
              />
              <select
                value={newStudentClassStanding}
                onChange={(e) => setNewStudentClassStanding(e.target.value)}
              >
                <option value="">Select classStanding</option>
                {ClassStandings.map((standing, index) => (
                  <option key={index} value={standing}>{standing}</option>
                ))}
              </select>
            </>
          )}
          <button className='student-button' onClick={handleAddStudent}>Add Student</button>
        </div>
    </>
  );
}

export default StudentComponent;
