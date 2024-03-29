import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import { signUp } from 'aws-amplify/auth';

import "../../App.css";

function StudentComponent({setDisplayClasses, selectedClass, setSelectedClass, students, setStudents, allGradeDescriptionsAndWeights, setAllGradeDescriptionsAndWeights }) {
    
  const [availableStudents, setAvailableStudents] = useState([]);
  const [newStudentsID, setNewStudentID] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
        
  const [displayGradeWeightScreen, setDisplayGradeWeightScreen] = useState(false);
  const [newGradeDescription, setNewGradeDescription] = useState('');
  const [editedGrade, setEditedGrade] = useState(null);
  const [newGradeScore, setNewGradeScore] = useState('');

  const [studentsAndClassAverages, setStudentAndClassAverages] = useState([]);

  const [SaveWeightErrorMessage, setSaveWeightErrorMessage] = useState('');
  const [addDescriptionErrorMessage, setAddDescriptionErrorMessage] = useState('');

  //#region Student functions
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

    CalculateStudentsAverage();
    fetchAvailableStudents();
  }, [selectedClass]);
        
   
  const handleBackToClassesClick = () => {
    setSelectedClass(null);
    setStudents([]); // Clear the list of students when going back to the list of classes
    setAllGradeDescriptionsAndWeights([]);
    setDisplayClasses(true);
  };  
  //#endregion
  
 
  //#region Weighted scale

  const handleEditGradeWeightedScale = async () => {
    setDisplayGradeWeightScreen(true);
  }

  const handleSaveGradeWeights = async () => {
    //ensure total grade weight doen't exceed 100
    if (SaveWeightErrorMessage.trim() !== ''){
      return;
    }

    console.log("students: ", students);

    
     // Update the weight of each description for all the previous grades of each student in the class
     students.forEach(async (student) => {
      allGradeDescriptionsAndWeights.forEach(async (gradeDescription) => {
        const grade = student.grades.find((grade) => grade.description === gradeDescription.description);
        if (grade) {
          await helper.updateGrade(grade.id, grade.description, grade.score, gradeDescription.weight);
        }
      });
    });
    
    CalculateStudentsAverage();
    setDisplayGradeWeightScreen(false);
    setNewGradeDescription('');
    
  }

  const handleWeightInputChange = (event, index) => {
    const { value } = event.target;
    const updatedGradeDescriptions = [...allGradeDescriptionsAndWeights];
    updatedGradeDescriptions[index].weight = value;
    setAllGradeDescriptionsAndWeights(updatedGradeDescriptions);
    console.log("updated grade list: ", updatedGradeDescriptions);
  };
  
  //waits for user to press enter on keyboard to exit input
  const handleWeightInputKeyDown = async (event) => {
    if (event.key === 'Enter' || event.type === 'blur') {
      console.log("grade detail ofc: ",allGradeDescriptionsAndWeights);
      const totalweight = allGradeDescriptionsAndWeights.reduce((total, gradedetail)=> total + parseFloat(gradedetail.weight), 0);
      if (totalweight > 100){
        setSaveWeightErrorMessage(`Total weight exceeds 100, by ${totalweight - 100}. Please adjust weight to be less than or equal to 100`);
      }else{
        setSaveWeightErrorMessage('');
      }
    }
  };

//#endregion


  //#region Grade Scores
  const handleAddGradeDescription = async () => {
    try {
      
      //Prevent User from entering a blank description or duplicate entries
      if (newGradeDescription.trim() === '') {
        setAddDescriptionErrorMessage("Cannot add Blank Entry.");
        console.log("Please enter a valid grade description.");
        return;
      } else if (allGradeDescriptionsAndWeights.some(descriptionDetail => descriptionDetail.description.toLowerCase() === newGradeDescription.toLowerCase())) {
        setAddDescriptionErrorMessage("Description Already exist");
        setNewGradeDescription('');
        console.log("Grade description already exists.");
        return;
      }

      setAddDescriptionErrorMessage('');

     // Update the local state first
     setAllGradeDescriptionsAndWeights(prevGradeDescriptions => [
      ...prevGradeDescriptions, 
      {description: newGradeDescription, weight:0}]);
     // Add the new grade description for each student
     students.forEach(async (student) => {
       await helper.addGrade(selectedClass.id, student.id, newGradeDescription, 0,0);
     });
     setNewGradeDescription('');      
    } catch (error) {
      console.error("Error adding new grade description:", error);
    }
  };

  const handleScoreButtonClick = (studentId, gradeId, gradeDescription, weight) => {
    setEditedGrade({ studentId, gradeId, gradeDescription , weight});
  };
  
  const handleScoreInputChange = (event) => {
    setNewGradeScore(event.target.value);
  };
  
  const handleScoreInputKeyDown = async (event) => {
    if (event.key === 'Enter' || event.type === 'blur') {
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
      await helper.updateGrade(editedGrade.gradeId, editedGrade.gradeDescription.description, newGradeScore, editedGrade.weight);
    
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

       //ReCalculate the average grade for the student
      const studentAverage = await helper.CalculateAverageGrade(editedGrade.studentId, selectedClass.id);
      setStudentAndClassAverages(prevAverages => {
        const studentIndex = prevAverages.findIndex(average => average.studentId === editedGrade.studentId);
        if (studentIndex !== -1) {
          const updatedAverages = [...prevAverages];
          updatedAverages[studentIndex] = { ...updatedAverages[studentIndex], average: studentAverage };
          return updatedAverages;
        }
        return prevAverages;
      });

      setEditedGrade(null);
      setNewGradeScore('');
      
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };
//#endregion

const CalculateStudentsAverage = async () => {
  try {
    // Initialize an array to store student averages
    setStudentAndClassAverages([]);
    const averages = [];
    console.log("Students: ", students);
    students.forEach(async (student) => {
      // Calculate the average grade for each student
      const studentAverage = await helper.CalculateAverageGrade(student.id, selectedClass.id);
   //   console.log(` ${student.name} in class ${selectedClass.id} has an average of ${studentAverage}`)
      averages.push({ studentId: student.id, average: studentAverage });
    });
    setStudentAndClassAverages(averages);
   console.log("averages: ", averages);
  } catch (error) {
    console.log("Error Calculating Students Averages: ", error);
  }
};

  return(
    <>
      {!displayGradeWeightScreen && (
        <>
      <button className='back-button' onClick={handleBackToClassesClick}>&#8592;Back to Classes</button>
      <h2 style={{ marginTop: '20px' }}>Students in {selectedClass && selectedClass.subject}:</h2>
          <table>
            <thead>
              <tr>
                <th>Student name</th>
                <th>Class standing</th>
                {/* Render grade descriptions */}
                {allGradeDescriptionsAndWeights.map(gradeDescription => (
                  <th key={gradeDescription.description}>{gradeDescription.description}</th>
                ))}
                <th>Total Average</th>
                <th>
                  {addDescriptionErrorMessage && <p className="error-message">{addDescriptionErrorMessage}</p>}
                  <input
                  type="text"
                  placeholder="Assignment description"
                  value={newGradeDescription}
                  onChange={(e) => setNewGradeDescription(e.target.value)}
                  />
                  <button className='student-button' onClick={handleAddGradeDescription}>Add Description</button>
                </th>
              </tr>
            </thead>
            <tbody>
              <>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td>{student && student.name}</td>
                  <td>{student && student.classStanding}</td>
                  {allGradeDescriptionsAndWeights.map(gradeDescription => {
                    const grade = Array.isArray(student.grades) ? student.grades.find(grade => grade && grade.description === gradeDescription.description) : null;
                    return (
                      <td key={`${student.id}-${gradeDescription.description}`}>
                        {editedGrade && editedGrade.studentId === student.id && editedGrade.gradeDescription === gradeDescription ? (
                          <input
                            className="short-input" 
                            type="number"
                            value={newGradeScore}
                            onChange={handleScoreInputChange}
                            onKeyDown={handleScoreInputKeyDown}
                            onBlur={handleScoreInputKeyDown}
                          />
                        ) : (
                          <button className='grade-button' onClick={() => handleScoreButtonClick(student.id, grade ? grade.id : null, gradeDescription, grade ? grade.weight : null)}>
                            {grade ? grade.score : '-'}
                          </button>
                        )}
                      </td>);
                  })}
                  <td>
                    {studentsAndClassAverages.find(average => average.studentId === student.id)?.average ?? '-'}
                  </td>
                  
                  {index === 0 && <td rowSpan={students.length} style={{ verticalAlign: 'top' }} > 
                    <button className='student-button' onClick={handleEditGradeWeightedScale}>Edit Weighted Scale</button>
                  </td>}
                </tr>
              ))}
              </>
            </tbody>
          </table>
        </>
        )}
        {displayGradeWeightScreen && (
          <>
            <h3>Assign Grade Weight For Assignments:</h3>
            <div className="grade-weight-container">
              {allGradeDescriptionsAndWeights.map((gradeDescription, index) => (
                <div key={index} className="grade-description">
                  <span>{gradeDescription.description}</span>
                  <input
                    type="number"
                    value={gradeDescription.weight}
                    onChange={(e) => handleWeightInputChange (e, index)}
                    onKeyDown={handleWeightInputKeyDown}
                    onBlur={handleWeightInputKeyDown}
                  />
                </div>
              ))}
            </div>
            <button className='save-button' onClick={handleSaveGradeWeights}>Done</button>
            {SaveWeightErrorMessage && <p className="error-message">{SaveWeightErrorMessage}</p>}
          </>
)}

    </>
  );
}

export default StudentComponent;