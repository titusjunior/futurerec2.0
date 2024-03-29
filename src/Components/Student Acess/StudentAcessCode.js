import React, { useState, useEffect } from 'react';
import Career from  './CareersDeterminer';
import ClassComponent from './StudentClassComponent';
import StudentGrades from './StudentGradesComponent';
import Major from './MajorsDeterminer';
import padlockImg from "../../padlock.jpg";

import { fetchUserAttributes } from 'aws-amplify/auth';

function StudentAcess({selectedPage}) {
    const [studentId, setStudentID] = useState('');

    const [grades, setGrades] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [displayGrades,setDisplayGrades] = useState(false); 

    useEffect(() => {
        const fetchstudentId = async () => {
          try {
            const studentIdValue = await fetchUserAttributes();
            setStudentID(studentIdValue.sub);
            console.log("initial student value", studentIdValue);
           
          } catch (error) {
            console.error("Error fetching teachers:", error);
          }
        };
    
        fetchstudentId();
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
                       {!displayGrades && (
                            <ClassComponent 
                            setGrades = {setGrades}
                            classes = {classes}
                            setClasses={setClasses}
                            setSelectedClass = {setSelectedClass}
                            setDisplayGrades={setDisplayGrades}
                            />
                        )}{displayGrades && (
                            <StudentGrades
                                studentID = {studentId}
                                grades = {grades}
                                setGrades = {setGrades}
                                setSelectedClass = {setSelectedClass}
                                selectedClass = {selectedClass}
                                setDisplayGrades={setDisplayGrades}
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
                    {selectedPage === 'Majors' && (
                        <Major
                            studentID={studentId}
                        />
                    )}
                    {selectedPage === 'Careers' && (
                        <Career
                        studentID = {studentId}
                        />
                    )}
            </div>
        </>

    );

}
export default StudentAcess;