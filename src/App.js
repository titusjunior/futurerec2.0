import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect,useState } from 'react';
import * as helper from './helperfunctions';

import config from './aws-exports';

Amplify.configure(config);

function App({ signOut, user }) {

  const [teachers, setTeachers] = useState([]);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [newClassSubject, setNewClassSubject] = useState('')
  const [displayClasses, setDisplayClasses] = useState(false); // State variable to determine whether to display classes or teachers
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teacherList = await helper.getListOfTeachers();

        if (teacherList && teacherList.items) { // Check if teacherList and teacherList.items are not null or undefined
          console.log("teachers sorted")
          const sortedTeachers = teacherList.items.sort((a, b) => a.name.localeCompare(b.name));
          setTeachers(sortedTeachers);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleTeacherClick = async (teacherId) => {
    try {
      const teacher = await helper.getTeacher(teacherId);
      setSelectedTeacher(teacher);
      const classList = await helper.getListOfClassesForTeacher(teacherId);
      setClasses(classList)
      /*if (classList && classList.items) { // Check if teacherList and teacherList.items are not null or undefined
        console.log("WE ARE HERE!!!")
        const sortedClasses = classList.items.sort((a, b) => a.subject.localeCompare(b.subject));
        setClasses(sortedClasses);
        console.log("classes:", sortedClasses);
      }*/
      setDisplayClasses(true); // Set to true to display classes
      console.log("Teacher data:", teacher);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
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

  const handleAddTeacher = async () => {
    try {
      const newTeacher = await helper.createTeacher(newTeacherName);
      console.log("New teacher created:", newTeacher);
      setTeachers(prevTeachers => [...prevTeachers, newTeacher]);
      setNewTeacherName(''); // Clear the input field after adding the teacher
    } catch (error) {
      console.error("Error adding new teacher:", error);
    }
  };

  const handleBackButtonClick = () => {
    setSelectedTeacher(null); // Clear the selected teacher
    setClasses([]); // Clear the list of classes
    setDisplayClasses(false); // Set to false to display teachers
  };

  const handleClassClick = async (classId) => {
    try {
      const classInfo = await helper.getClass(classId);
      setSelectedClass(classInfo);
      console.log("Class clicked with ID:", selectedClass);
    } catch (error) {
      console.error("Error handling class click:", error);
    }
  };


  return (
    <>
      <h1>Hello {user.username}</h1>
      {!displayClasses && ( // If displayClasses is false, show the list of teachers
        <>
          <div>
            <h2>Current Teachers:</h2>
            {teachers.map(teacher => (
              <button key={teacher.id} onClick={() => handleTeacherClick(teacher.id)}>
                {teacher.name}
              </button>
            ))}
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Enter teacher's name" 
              value={newTeacherName} 
              onChange={(e) => setNewTeacherName(e.target.value)} 
            />
            <button onClick={handleAddTeacher}>Add New Teacher</button>
          </div>
        </>
      )}
      {displayClasses && ( // If displayClasses is true, show the list of classes
        <>
          <h2>Classes for {selectedTeacher.name}:</h2>
          <button onClick={handleBackButtonClick}>Back to Teachers</button> {/* Add back button */}
          <div>
            {classes.map(classItem => (
            <button key={classItem.id} onClick={() => handleClassClick(classItem.id)}>
              {classItem.subject}
            </button>
           ))}
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Enter class name" 
              value={newClassSubject} 
              onChange={(e) => setNewClassSubject(e.target.value)} 
            />
            <button onClick={handleAddClass}>Add Class</button>
          </div>
        </>
      )}
      <button onClick={signOut}>Sign out</button>
    </>
  );
}



export default withAuthenticator(App);
