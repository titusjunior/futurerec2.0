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
            <div className="body">   
                <div className="home">
                    <h1>Welcome to FutureRec!</h1>
                    <br></br>
                    <p>Unlock your full potential with our range of features designed to support your educational journey. Whether you're seeking top grades, personalized tutoring assistance, insightful recommendations, or simply looking to explore various school resources, you'll find everything you need right here.</p>
                    <br></br>
                    <p>Empower yourself with our grade tracking system, allowing you to monitor your progress effortlessly and stay on top of your academic goals. Need a helping hand? Our dedicated team of tutoring assistants is ready to provide tailored support and guidance, ensuring you grasp even the most challenging concepts with confidence.</p>
                    <br></br>
                    <p>At FutureRec, education is more than just grades—it's about fostering a supportive community and empowering students to thrive. Join us on this journey of learning, growth, and endless possibilities. Welcome to a brighter academic future.</p>
                </div>  
            </div>
            )}
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