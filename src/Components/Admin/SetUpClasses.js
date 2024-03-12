import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import "../../App.css";

function OrganizeClasses() {
  const [displayClasses, setDisplayClasses] = useState(true);
    
  const [teachers, setTeachers] = useState([]);
  const [newTeacherName, setNewTeacherName] = useState('');

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newClassSubject, setNewClassSubject] = useState('');
  const [classErrorMessage, setClassErrorMessage] = useState('');

  const [availableStudents, setAvailableStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const handleBackClick = () => {
    setDisplayClasses(true);
    setSelectedClass(null);
    setAvailableStudents([]);
    setStudents([]);
    setTeachers([]);
    setNewTeacherName('')
  };

//#region classes

    useEffect(() => {
        const fetchClasses = async () => {
          try {
            const classList = await helper.getListOfClasses();
            console.log("classes: ", classList);

            if (classList) {
              const sortedClasses = classList.sort((a, b) => a.subject.localeCompare(b.subject));
              setClasses(sortedClasses);
              console.log("classes fetched");
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
          console.log("class selected: ", classInfo);
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
          const newClass = await helper.addClass(newClassSubject);
          setClasses(prevClasses => [...prevClasses, newClass]);
          setNewClassSubject('');
        } catch (error) {
          console.error("Error adding new class:", error);
        }
      };

//#endregion 

//#region associate teacher - class

useEffect(() => {
  const fetchTeachers = async () => {
    try {
      const teacherList = await helper.getListOfTeachers();
      if (teacherList && teacherList.items) {
        const sortedTeachers = teacherList.items.sort((a, b) => a.name.localeCompare(b.name));
        setTeachers(sortedTeachers);
        console.log("teachers: ",sortedTeachers);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  fetchTeachers();
}, [selectedClass]);

const handleNewTeacher = async (e) => {
  const selectedTeacherId = e.target.value;
  setNewTeacherName(selectedTeacherId);
  await helper.updateClass(selectedClass.id, selectedTeacherId);
  console.log("Updated class:", );
  const classInfo = await helper.getClass(selectedClass.id);
  setSelectedClass(classInfo);
};

//#endregion

//#region Add Students

  useEffect(() => {
    const fetchAvailableStudents = async () => {
      try {
        if (selectedClass) {
          const studentsInClass = await helper.getStudentsForClass(selectedClass.id);
          const allStudents = await helper.getListOfAllStudents();
          const studentsNotInClass = allStudents.filter(student => !studentsInClass.some(({ id }) => id === student.id));
          setStudents(studentsInClass);
          setAvailableStudents(studentsNotInClass);
        }
      } catch (error) {
        console.error("Error fetching available students:", error);
      }
    };

    fetchAvailableStudents();
  }, [!displayClasses && selectedClass.teacherClassesId]);

  const handleAddStudent = async (event) => {
    const studentId = event.target.value;
    await helper.associateStudentWithClass(selectedClass.id, studentId);
    const addedStudent = availableStudents.find(student => student.id === studentId);
    setStudents([...students, addedStudent]);
    setAvailableStudents(availableStudents.filter(student => student.id !== studentId));
    setSelectedStudentId('');
  };


//#endregion

  return(
    <>
      { displayClasses &&(
        <>
          <h2 style={{ marginTop: '20px' }}>Current Classes: </h2> {/* Added null check for selectedTeacher */}
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
      )}{!displayClasses && !selectedClass.teacherClassesId && (
        <>
          <h3>{selectedClass.subject}:</h3>
            <div>
              <span>Add Class Teacher: </span>
              <select value={newTeacherName} 
                onChange={handleNewTeacher}>
                <option value="">Select teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </div>
        </>
      )}{!displayClasses && selectedClass.teacherClassesId && (
        <>
          <button className='back-button' onClick={handleBackClick}>&#8592;Back To Classes</button>
          <h3 style={{ textDecoration: 'underline' }}>{selectedClass.subject}</h3>
          <br/>
          <p><strong>&nbsp;&nbsp;&nbsp;Teacher:</strong> {selectedClass.teacherID.name}</p>
          <br/>
          <p><strong>&nbsp;&nbsp;&nbsp;&nbsp;Students:</strong> </p>

          {students.map(student => (
            <div key={student.id} style={{ marginTop: '5px', marginLeft: '70px'}}>
            <p>- {student.name}</p>
            </div>
          ))}
            
          <br/>
          <h3>Add Student:</h3>
          <select value={selectedStudentId} onChange={handleAddStudent}>
            <option value="">Select existing student</option>
            {availableStudents.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </>
      )}
    </>
  );
}
export default OrganizeClasses;
