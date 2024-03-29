import React, { useState, useEffect } from 'react';
import "../App.css";
import { fetchUserAttributes } from 'aws-amplify/auth';

import ClassComponent from './Teacher Acesss/ClassCompnent';
import StudentComponent from './Teacher Acesss/Student&GradeComponent';

//import PopulateCareerDB from './Admin/PopulateCareersDB';
//import PopulateMajorDB from './Admin/PopulateMajorsDB';
import padlockImg from "../padlock.jpg";

function TeacherAcess({selectedPage}) {
    const [teacherId, setTeacherId] = useState('');
    
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [allGradeDescriptionsAndWeights,setAllGradeDescriptionsAndWeights] = useState([]);
    const [displayClasses, setDisplayClasses] = useState(true);


    useEffect(() => {
        const fetchTeacherId = async () => {
          try {
            const teacherIdValue = await fetchUserAttributes();
            setTeacherId(teacherIdValue.sub);
            console.log("initial student value", teacherIdValue);
          } catch (error) {
            console.error("Error fetching teachers:", error);
          }
        };
    
        fetchTeacherId();
      }, []);

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
            {selectedPage === 'Tutoring' && (
                <div className="tutoring">
                    <img src={padlockImg} alt="construction" />
                    <h1>This page is currently under construction</h1>
                    <h2>Our team is hard at work to bring you this new and exciting update!</h2>
                </div>
            )}
    </div>
</>
  );
}

export default TeacherAcess;