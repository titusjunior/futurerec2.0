import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import "../../App.css";

function TeacherComponent({ setSelectedTeacher, setClasses, setDisplayClasses, setDisplayTeachers}) {
  const [teachers, setTeachers] = useState([]);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [teacherErrorMessage, setTeacherErrorMessage] = useState('');

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
      setDisplayTeachers(false);
      console.log("teacher clicked",teacher);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  const handleAddTeacher = async () => {
    try {
      //Prevent User from entering a blank Teacher Name
      if (newTeacherName.trim() === '') {
        setTeacherErrorMessage("Cannot add a blank teacher name");
        console.log("Cannot add a blank teacher name");
        return;
      }
      setTeacherErrorMessage('');

      const newTeacher = await helper.createTeacher(newTeacherName);
      console.log("New teacher created:", newTeacher);
      setTeachers(prevTeachers => [...prevTeachers, newTeacher]);
      setNewTeacherName('');
    } catch (error) {
      console.error("Error adding new teacher:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Current Teachers:</h2>
        {teachers.map(teacher => (
          <div key={teacher.id}>
            <button onClick={() => handleTeacherClick(teacher.id)}>
              {teacher && teacher.name}
            </button>
          </div>
        ))}
        <div>
          <input
            type="text"
            placeholder="New teacher's name"
            value={newTeacherName}
            onChange={(e) => setNewTeacherName(e.target.value)}
          />
          <button className='student-button' onClick={handleAddTeacher}>Add New Teacher</button>
          {teacherErrorMessage && <p className="error-message">{teacherErrorMessage}</p>}
        </div>
      </div>
    </>
  );
}

export default TeacherComponent;
