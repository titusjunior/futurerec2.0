import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import "../../App.css";
import Career from  "../Student Acess/CareersDeterminer"

function StudentComponent({setDisplayStudents, setDisplayClasses, selectedClass, setSelectedClass, students, setStudents, allGradeDescriptionsAndWeights, setAllGradeDescriptionsAndWeights }) {
    
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClassStanding, setNewStudentClassStanding] = useState('');
  const [isExistingStudentSelected, setIsExistingStudentSelected] = useState(false);
        
  const [displayGradeWeightScreen, setDisplayGradeWeightScreen] = useState(false);
  const [newGradeDescription, setNewGradeDescription] = useState('');
  const [editedGrade, setEditedGrade] = useState(null);
  const [newGradeScore, setNewGradeScore] = useState('');

  const [studentsAndClassAverages, setStudentAndClassAverages] = useState([]);

  const [SaveWeightErrorMessage, setSaveWeightErrorMessage] = useState('');
  const [addDescriptionErrorMessage, setAddDescriptionErrorMessage] = useState('');
  const [addStudentErrorMessage, setAddStudentErrorMessage] = useState('');

  const ClassStandings = ["Freshman", "Sophmore", "Junior", "Senior"];

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
        

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedStudentId(value);
    setNewStudentName('');
    setIsExistingStudentSelected(!!value); // Convert value to boolean and set state
  };
    
  const handleBackToClassesClick = () => {
    setSelectedClass(null);
    setStudents([]); // Clear the list of students when going back to the list of classes
    setAllGradeDescriptionsAndWeights([]);
    setDisplayClasses(true);
    setDisplayStudents(false);
  };
  
  const handleAddStudent = async () => {
    try { 
      //Prevent User from entering a blank Student
      if(!selectedStudentId && newStudentName.trim() === '' && newStudentClassStanding.trim() === ''){
        setAddStudentErrorMessage("Cannot add a blank Entry.Ensure either an existing student is selcted or enter a valid student name and class standing");
        console.log("Cannot Add a blank entries");
        return;
      }else if (!selectedStudentId && (newStudentName.trim() === '')) {
        setAddStudentErrorMessage("Cannot add a blank student name.Ensure either an existing student is selcted or enter a valid student name");
        console.log("Cannot Add a blank student");
        return;
      }else if (!selectedStudentId && ( newStudentClassStanding.trim() === '')){
        setAddStudentErrorMessage("PLease select a valid class Standing.Ensure either an existing student or a class Standing is selected");
        console.log("Cannot Add a blank classStanding");
        return;
      }
      setAddStudentErrorMessage('');

      if (selectedStudentId) {
        await helper.associateStudentWithClass(selectedClass.id, selectedStudentId);
        const addedStudent = availableStudents.find(student => student.id === selectedStudentId);
        setStudents([...students, addedStudent]);
        setAvailableStudents(availableStudents.filter(student => student.id !== selectedStudentId));
        //set initial score for all test already in class
        allGradeDescriptionsAndWeights.forEach(async (gradeDescription) => {
          await helper.addGrade(selectedClass.id, selectedStudentId, gradeDescription.description, 0, gradeDescription.weight);
        });
      } else if (newStudentName.trim() !== '') {
        const newStudent = await helper.addStudent(newStudentName, newStudentClassStanding);
        setStudents([...students, newStudent]);
        await helper.associateStudentWithClass(selectedClass.id, newStudent.id);

        allGradeDescriptionsAndWeights.forEach(async (gradeDescription) => {
          await helper.addGrade(selectedClass.id, newStudent.id, gradeDescription.description, 0, gradeDescription.weight);
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
    students.forEach(async (student) => {
      // Calculate the average grade for each student
      const studentAverage = await helper.CalculateAverageGrade(student.id, selectedClass.id);
   //   console.log(` ${student.name} in class ${selectedClass.id} has an average of ${studentAverage}`)
      averages.push({ studentId: student.id, average: studentAverage });
    });
    setStudentAndClassAverages(averages);
   // console.log("averages: ", studentsAndClassAverages);
  } catch (error) {
    console.log("Error Calculating Students Averages: ", error);
  }
};


  return(
    <>

    {/*For Testing Purposes */}
    {/*<Career/>*/}

    {/*For Testing Purposes */}


      <h2>Students in {selectedClass && selectedClass.subject}:</h2>
      {!displayGradeWeightScreen && (
        <>
          <button className='student-button' onClick={handleBackToClassesClick}>Back to Classes</button>
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
                  <div><button className='student-button' onClick={handleEditGradeWeightedScale}>Edit Weighted Scale</button></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
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
            {addStudentErrorMessage && <p className="error-message">{addStudentErrorMessage}</p>}
          </div>
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
            <button className='student-button' onClick={handleSaveGradeWeights}>Done</button>
            {SaveWeightErrorMessage && <p className="error-message">{SaveWeightErrorMessage}</p>}
          </>
)}

    </>
  );
}

export default StudentComponent;
