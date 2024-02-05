import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/api';
//import { createStudent } from './graphql/mutations'; 
import * as mutations from './graphql/mutations';
import React, { useEffect } from 'react';

import config from './aws-exports';

Amplify.configure(config);

const client = generateClient();

function App({ signOut, user }) {
  useEffect(() => {
    const createNewStudent = async () => {
      try {
        const studentData = {
          name: "Student 2",
          classStanding: "Sophomore 1",
          grade: 13
        };

        const result = await client.graphql({
          //query: createStudent, 
          query: mutations.createStudent,
          variables: { input: studentData }
        });

        console.log("New student created successfully");
      } catch (error) {
        console.error("Error creating new student:", error);
      }
    };

    createNewStudent();
  }, []);

  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
