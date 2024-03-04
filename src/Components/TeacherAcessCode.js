import React, { useState } from 'react';
import "../App.css";

import TeacherComponent from './Teacher Acesss/TeacherComponent';
import ClassComponent from './Teacher Acesss/ClassCompnent';
import StudentComponent from './Teacher Acesss/Student&GradeComponent';

function TeacherAcess({selectedPage}) {

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [allGradeDescriptions,setAllGradeDescriptions] = useState([]);
    const [displayTeachers, setDisplayTeachers] = useState(true);
    const [displayClasses, setDisplayClasses] = useState(false);
    const [displayStudents, setDisplayStudents] = useState(false);

  return (
    <>
        <div>
            {selectedPage === 'Home' && (
            
            <h1>Home</h1>)}






            
            {selectedPage === 'Grades' && (
                <>{displayTeachers && (
                <TeacherComponent 
                    setSelectedTeacher={setSelectedTeacher} 
                    setClasses={setClasses} 
                    setDisplayClasses={setDisplayClasses}
                    setDisplayTeachers={setDisplayTeachers}
                />)}
                {displayClasses && (
                    <ClassComponent 
                    setDisplayTeacher={setDisplayTeachers}
                    setDisplayClasses={setDisplayClasses}
                    setDisplayStudents={setDisplayStudents}
                    setSelectedTeacher={setSelectedTeacher}
                    selectedTeacher = {selectedTeacher}
                    setSelectedClass = {setSelectedClass}
                    selectedClass={selectedClass}
                    setStudents = {setStudents}
                    allGradeDescriptions = {allGradeDescriptions}
                    setAllGradeDescriptions = {setAllGradeDescriptions}
                    classes={classes}
                    setClasses={setClasses}
                    />
                )}
                {displayStudents && (
                <StudentComponent
                setDisplayClasses={setDisplayClasses}
                setDisplayStudents={setDisplayStudents}
                selectedClass = {selectedClass}
                setSelectedClass = {setSelectedClass}
                students = {students}
                setStudents = {setStudents}
                allGradeDescriptions = {allGradeDescriptions}
                setAllGradeDescriptions = {setAllGradeDescriptions}
                />
                )}
                </>
            )}
            {selectedPage === 'Tutoring' && (<h1>Tutoring</h1>)}
            {selectedPage === 'Majors' && <h1>Majors</h1>}
            {selectedPage === 'Careers' && <h1>Careers</h1>}
            {selectedPage === 'Settings' && <h1>Settings</h1>} 
    </div>
</>
  );
}

export default TeacherAcess;