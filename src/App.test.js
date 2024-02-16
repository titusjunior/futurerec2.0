import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect } from 'react';
import * as mutations from './graphql/mutations';
import { generateClient } from 'aws-amplify/api';

import config from './aws-exports';

Amplify.configure(config);

const client = generateClient();

function App({ signOut, user }) {
  useEffect(() => {
    const addClassAndStudent = async () => {
      try {
        // Create a teacher
        const teacherData = { name: "Mr. Smith" };
        const newTeacher = await client.graphql({
          query: mutations.createTeacher,
          variables: { input: teacherData }
        });
        console.log(newTeacher.data.createTeacher)

        // Create a class
        const classData = { subject: "Math", teacherID: newTeacher.id };
        const newClass = await client.graphql({
          query: mutations.createClass,
          variables: { input: classData }
        });
        console.log(newClass.data.createClass)

        // Create a student
        const studentData = { name: "Elivi", classStanding: "Sophomore 1"};
        const newStudent = await client.graphql({
          query: mutations.createStudent,
          variables: { input: studentData }
        });
        console.log(newStudent.data);

        //Associate student with class
        try {
          const studentClassData = { classId: newClass.data.createClass.id, studentId: newStudent.data.createStudent.id };
          await client.graphql({
            query: mutations.createStudentClassLink,
            variables: { input: studentClassData } 
          });
        } catch (error) {
          console.error("Error linking student to class", error)
        }


        try{
          // Add grade for the student
          const gradeData = { description: "Test 1", score: 100};
          await client.graphql({
            query: mutations.createGrade,
            variables: { input: gradeData }
          });
        }catch(error){
          console.error("Error creating grade", error)
        }

        console.log("Class, student, and grade added successfully");
      } catch (error) {
        console.error("Error adding class, student, and grade:", error);
      }
    };

    addClassAndStudent();
  }, []);

  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
