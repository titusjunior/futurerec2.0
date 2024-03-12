import React, { useState } from 'react';
import "../App.css";

import TeacherComponent from './Teacher Acesss/TeacherComponent';
import ClassComponent from './Teacher Acesss/ClassCompnent';
import StudentComponent from './Teacher Acesss/Student&GradeComponent';

import PopulateCareerDB from './Admin/PopulateCareersDB';
import PopulateMajorDB from './Admin/PopulateMajorsDB';

function TeacherAcess({selectedPage}) {

    const teacherId = "da26e23e-62a1-4829-bcf1-e7a4e0b4570e"

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [allGradeDescriptionsAndWeights,setAllGradeDescriptionsAndWeights] = useState([]);
    const [displayClasses, setDisplayClasses] = useState(true);

  return (
    <>
        <div>
            {selectedPage === 'Home' && (   
                <div className="home">
                    <h1>Welcome to FutureRec!</h1>
                    <br></br>
                    <p>Unlock your full potential with our range of features designed to support your educational journey. Whether you're seeking top grades, personalized tutoring assistance, insightful recommendations, or simply looking to explore various school resources, you'll find everything you need right here.</p>
                    <br></br>
                    <p>Empower yourself with our grade tracking system, allowing you to monitor your progress effortlessly and stay on top of your academic goals. Need a helping hand? Our dedicated team of tutoring assistants is ready to provide tailored support and guidance, ensuring you grasp even the most challenging concepts with confidence.</p>
                    <br></br>
                    <p>At FutureRec, education is more than just grades—it's about fostering a supportive community and empowering students to thrive. Join us on this journey of learning, growth, and endless possibilities. Welcome to a brighter academic future.</p>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </div>  
            )}
            {selectedPage === 'Grades' && (
                <>
                {displayClasses && (
                    <ClassComponent 
                    setDisplayClasses={setDisplayClasses}
                    teacherId = {teacherId} 
                    setSelectedClass = {setSelectedClass}
                    setStudents = {setStudents}
                    allGradeDescriptionsAndWeights = {allGradeDescriptionsAndWeights}
                    setAllGradeDescriptionsAndWeights = {setAllGradeDescriptionsAndWeights}
                    />
                )}
                {!displayClasses && (
                    <StudentComponent
                        setDisplayClasses={setDisplayClasses}
                        selectedClass = {selectedClass}
                        setSelectedClass = {setSelectedClass}
                        students = {students}
                        setStudents = {setStudents}
                        allGradeDescriptionsAndWeights = {allGradeDescriptionsAndWeights}
                        setAllGradeDescriptionsAndWeights = {setAllGradeDescriptionsAndWeights}
                    />
                )}
                </>
            )}
            {selectedPage === 'Tutoring' && (<h1>Settings</h1>
            )}
            {selectedPage === 'Majors' && (
                <PopulateMajorDB></PopulateMajorDB>
            )}
            {selectedPage === 'Careers' && (
                <PopulateCareerDB></PopulateCareerDB>
            )}
            {selectedPage === 'Settings' && <h1>Settings</h1>} 
    </div>
</>
  );
}

export default TeacherAcess;