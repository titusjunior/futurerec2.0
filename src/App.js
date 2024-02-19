import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect, useState } from 'react';
import * as helper from './helperfunctions';

import config from './aws-exports';

Amplify.configure(config);

function App({ signOut, user }) {

  const [teachers, setTeachers] = useState([]);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [newClassSubject, setNewClassSubject] = useState('');
  const [displayClasses, setDisplayClasses] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClassStanding, setNewStudentClassStanding] = useState('');


  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teacherList = await helper.getListOfTeachers();
        if (teacherList && teacherList.items) {
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
      setClasses(classList);
      setDisplayClasses(true);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  const handleAddTeacher = async () => {
    try {
      const newTeacher = await helper.createTeacher(newTeacherName);
      console.log("New teacher created:", newTeacher);
      setTeachers(prevTeachers => [...prevTeachers, newTeacher]);
      setNewTeacherName('');
    } catch (error) {
      console.error("Error adding new teacher:", error);
    }
  };

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
      console.log("Classes: ",classes);
      console.log("Class ID: ",classId);
      console.log("students: ",studentList);
      console.log("Class: ", selectedClass);
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
      setNewStudentName('');
      setNewStudentClassStanding('');
    } catch (error) {
      console.error("Error adding new student:", error);
    }
  };

  const handleaddGrade = async() =>{
  }

  return (
    <>
      <h1>Hello {user.username}</h1>
      {!displayClasses && (
        <>
          <div>
            <h2>Current Teachers:</h2>
            {teachers.map(teacher => (
              <div key={teacher.id}>
                <button onClick={() => handleTeacherClick(teacher.id)}>
                  {teacher && teacher.name} {/* Added null check for teacher */}
                </button>
              </div>
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
      {selectedTeacher && displayClasses && (
        <>
          <h2>Classes for {selectedTeacher && selectedTeacher.name}:</h2> {/* Added null check for selectedTeacher */}
          <button onClick={handleBackToTeachersClick}>Back to Teachers</button>
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
            <button onClick={handleAddClass}>Add Class</button>
          </div>
        </>
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
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student && student.name}</td>
            <td>{student && student.classStanding}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <input 
        type="text" 
        placeholder="Enter student name" 
        value={newStudentName} 
        onChange={(e) => setNewStudentName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter student class standing" 
        value={newStudentClassStanding} 
        onChange={(e) => setNewStudentClassStanding(e.target.value)} 
      />
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  </>
)}

      <button onClick={signOut}>Sign out</button>
    </>
  );
  
  
}

export default withAuthenticator(App);
