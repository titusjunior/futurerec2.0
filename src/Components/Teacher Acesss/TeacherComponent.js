import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import { fetchUserAttributes } from 'aws-amplify/auth';
import "../../App.css";

function TeacherComponent({ setSelectedTeacher, setClasses, setDisplayClasses, setDisplayTeachers}) {
  const [teachers, setTeachers] = useState([]);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [teacherErrorMessage, setTeacherErrorMessage] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teacher = [await helper.getTeacher()];
        if (teacher[0]) {
          setTeachers(teacher);
          console.log(teacher[0].id);
          handleTeacherClick(teacher[0].id);
        }else{
          handleAddTeacher()
          fetchTeachers();
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleTeacherClick = async (teacherId) => {
    try {
      const teacher = await helper.getTeacher();
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
      setTeacherErrorMessage('');
      const userInfo = await fetchUserAttributes();
      const full_name = userInfo.given_name + " " + userInfo.family_name;
      const newTeacher = await helper.createTeacher(full_name, userInfo.sub);
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
        <h2>Loading Classes</h2>
      </div>
    </>
  );
}

export default TeacherComponent;
