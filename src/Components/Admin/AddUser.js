import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import { signUp } from 'aws-amplify/auth';

function AddUserComponent({}) {

    const [userType, setUserType] = useState('');

    const [teachers, setTeachers] = useState([]);
    const [newTeacherName, setNewTeacherName] = useState('');
    const [newStudentEmail, setNewStudentEmail] = useState('');
    const [teacherErrorMessage, setTeacherErrorMessage] = useState('');

    const [students, setStudents] = useState([]);
    const [newStudentName, setNewStudentName] = useState('');
    const [newTeacherEmail, setNewTeacherEmail] = useState('');
    const [newStudentClassStanding, setNewStudentClassStanding] = useState('');
    const [addStudentErrorMessage, setAddStudentErrorMessage] = useState('');

    const ClassStandings = ["Freshman", "Sophmore", "Junior", "Senior"];

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
      };

    const handleBackClick = () => {
        setUserType('');
    };

    async function inviteNewUser({username, password, name, user_type}) {
      try {
        console.log("We are here");

        const signUpResponse = await signUp({
          username, 
          password,
          options: {
            userAttributes: {
              name,
              'custom:user_type':user_type
            },
            autoSignIn: true
          }
        });
        console.log("We are here 2");
        console.log(signUpResponse);
        return signUpResponse.userId;
      } catch (error) {
        console.log('error signing up:', error);
      }
    }


    //#region Add Teacher  
    useEffect(() => {
      const fetchTeachers = async () => {
        try {
          const teacherList = await helper.getListOfTeachers();
          if (teacherList && teacherList.items) {
            const sortedTeachers = teacherList.items.sort((a, b) => a.name.localeCompare(b.name));
            setTeachers(sortedTeachers);
            console.log("Teachers fetched");
          }
        } catch (error) {
          console.error("Error fetching teachers:", error);
        }
      };
  
      fetchTeachers();
    }, [userType === 'Teacher']);
  
     
    const handleAddTeacher = async () => {
      try {
        //Prevent User from entering a blank Teacher Name
        if (newTeacherName.trim() === '') {
          setTeacherErrorMessage("Cannot add a blank teacher name");
          console.log("Cannot add a blank teacher name");
          return;
        }
        setTeacherErrorMessage('');
        
        const signUpData = {username: newTeacherEmail, password: "Password1!", name: newTeacherName, user_type: "Teacher"};
        const newUserId = await inviteNewUser(signUpData);        
        
        console.log("newUserId: ", newUserId);
        console.log("Teacher Email: ", newTeacherEmail);
        console.log("newUser name: ", newTeacherName);
        const newTeacher = await helper.createTeacher(newUserId, newTeacherName);
        console.log("New teacher created:", newTeacher);
        setTeachers(prevTeachers => [...prevTeachers, newTeacher]);
        setNewTeacherName('');
        setNewTeacherEmail('');
      } catch (error) {
        console.error("Error adding new teacher:", error);
      }
    };
  
    //#endregion


    //#region  Add Student
    useEffect(() => {
        const fetchAvailableStudents = async () => {
          try {
            
            const studentList = await helper.getListOfAllStudents();

            if (studentList) {
                const sortedStudents = studentList.sort((a, b) => a.name.localeCompare(b.name));
                setStudents(sortedStudents);
                console.log("students fetched");
              }
          } catch (error) {
            console.error("Error fetching available students:", error);
          }
        };
        fetchAvailableStudents();
      }, [userType === 'Teacher']);
            
      
      const handleAddStudent = async () => {
        try { 
            //Prevent User from entering a blank Student
            if(newStudentName.trim() === '' && newStudentClassStanding.trim() === ''){
                setAddStudentErrorMessage("Cannot add a blank Entry.Enter a valid student name and class standing");
                console.log("Cannot Add a blank entries");
                return;
            }else if ((newStudentName.trim() === '')) {
                setAddStudentErrorMessage("Cannot add a blank student name. Enter a valid student name");
                console.log("Cannot Add a blank student");
                return;
            }else if (( newStudentClassStanding.trim() === '')){
                setAddStudentErrorMessage("PLease select a valid class Standing.");
                console.log("Cannot Add a blank classStanding");
                return;
            }
            setAddStudentErrorMessage('');

            const signUpData = {username: newStudentEmail, password: "Password1!", name: newStudentName, user_type: "Student"};
            const newUserId = await inviteNewUser(signUpData);        
        
            
            console.log("newUserId: ", newUserId);
            console.log("Student Email: ", newStudentEmail);
            console.log("new Student name: ", newStudentName);

            const newStudent = await helper.addStudent(newUserId,newStudentName, newStudentClassStanding);

            console.log("new student info: ", newStudent);

            setStudents([...students, newStudent]);
            setNewStudentName('');
            setNewStudentClassStanding('');
            setNewStudentEmail('');
        } catch (error) {
          console.error("Error adding new student:", error);
        }
      };

    //#endregion


    return(
        <>
            {!userType && (
            <>
                <h2>Add User:</h2>
                <br/>
                <label htmlFor="userType">Select User Type:</label>
                <select id="userType" value={userType} onChange={handleUserTypeChange}>
                    <option value="">Select...</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>
            </>
            )}
            {userType === "Teacher" && (
            <>
                <button className='back-button' onClick={handleBackClick}>&#8592;Back</button>
                <h2 style={{ marginTop: '20px' }}>Current Teachers:</h2>
                {teachers.map(teacher => (
                    <div key={teacher.id}>
                        <p style={{ marginTop: '10px' }}>{teacher && teacher.name}</p>
                    </div>
                ))}
                <div>
                <input
                    type="text"
                    placeholder="New teacher's name"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Teacher email"
                  value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                />
                <button className='student-button' onClick={handleAddTeacher}>Add New Teacher</button>
                {teacherErrorMessage && <p className="error-message">{teacherErrorMessage}</p>}
                </div>
            </>
            )}
            {userType === "Student" && (
            <>
                <button className='back-button' onClick={handleBackClick}>&#8592;Back</button>
                <h2 style={{ marginTop: '20px' }} >Current Students:</h2>

                {students.map(student => (
                    <div key={student.id}>
                        <p style={{ marginTop: '10px' }}>{student && student.name}</p>
                    </div>
                ))}

                <div>
                    <input
                    type="text"
                    placeholder="Or enter new student name"
                    value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                    />
                    <select
                    value={newStudentClassStanding}
                    onChange={(e) => setNewStudentClassStanding(e.target.value)}
                    >
                    <option value="">Select classStanding</option>
                    {ClassStandings.map((standing, index) => (
                        <option key={index} value={standing}>{standing}</option>
                    ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Student email"
                      value={newStudentEmail}
                      onChange={(e) => setNewStudentEmail(e.target.value)}
                    />
                    <button className='student-button' onClick={handleAddStudent}>Add Student</button>
                    {addStudentErrorMessage && <p className="error-message">{addStudentErrorMessage}</p>}
                </div>
            </>
            )}
        
        </>
    );
}

export default AddUserComponent;
