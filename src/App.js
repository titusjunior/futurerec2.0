import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "./App.css";
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect, useState } from 'react';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';



import profileImg from "./profile.jpg";
import logoutImg from "./logout.jpg";
import TeacherSelected from './Components/TeacherAcessCode'
import StudentSelected from './Components/Student Acess/StudentAcessCode'

import config from './aws-exports';

Amplify.configure(config);

function App({signOut, user}) {
  const [userIsTeacher, setUserIsTeacher] = useState(true);
  const [selectedPage, setSelectedPage] = useState('Home'); // State variable to track selected page

      useEffect(() => {
        // JavaScript code to toggle sidebar and set initial content
        let btn = document.querySelector('#btn');
        let sidebar = document.querySelector('.sidebar');
    
        btn.onclick = function () {
            sidebar.classList.toggle('active');
        };
    
        document.addEventListener('DOMContentLoaded', function () {
            changeContent('Home');
        });
        detectUser();
      }, []);

    async function changeContent(pageName){
    try {
        setSelectedPage(pageName);
    } catch (error) {
        console.error('Error changing content: ', error);
    }
    }

    async function detectUser() {
      const userInfo = await fetchUserAttributes();
      const user_type = userInfo["custom:user_type"]
      console.log(userInfo["custom:user_type"]);
      if(user_type == "Teacher") {
        setUserIsTeacher(true);
      } else if(user_type == "Student") {
        setUserIsTeacher(false);
      } else{
        setUserIsTeacher(false);
      }
      
    }

  return (
  <>
  <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" type="text/css" href="style.css" />
  <link
    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
    rel="stylesheet"
  />
  <title>FutureRec</title>
  <div className="sidebar">
    <div className="top">
      <div className="logo">
        <i className="bx bxs-book-open" />
        <span>FutureRec</span>
      </div>
      <i className="bx bx-menu" id="btn" />
    </div>
    <div className="user">
      <img src={profileImg} alt="me" className="user-img" />
      <div>
        <p className="bold">{user.username}</p>
      </div>
    </div>
    <ul>
      <li>
        <a href="#" onClick={() => changeContent('Home')}>
          <i className="bx bxs-home" />
          <span className="nav-item">Home</span>
        </a>
        <span className="tooltip">Home</span>
      </li>
      <li>
        <a href="#" onClick={() => changeContent('Grades')}>
          <i className="bx bx-bar-chart" />
          <span className="nav-item">Grades</span>
        </a>
        <span className="tooltip">Grades</span>
      </li>
      <li>
        <a href="#" onClick={() => changeContent('Tutoring')}>
          <i className="bx bxs-pencil" />
          <span className="nav-item">Tutoring</span>
        </a>
        <span className="tooltip">Tutoring</span>
      </li>
      <li>
        <a href="#" onClick={() => changeContent('Majors')}>
          <i className="bx bxs-graduation" />
          <span className="nav-item">Majors</span>
        </a>
        <span className="tooltip">Majors</span>
      </li>
      <li>
        <a href="#" onClick={() => changeContent('Careers')}>
          <i className="bx bxs-briefcase-alt-2" />
          <span className="nav-item">Careers</span>
        </a>
        <span className="tooltip">Careers</span>
      </li>
      <li>
        <a href="#" onClick={() => changeContent('Settings')}>
          <i className="bx bxs-cog" />
          <span className="nav-item">Settings</span>
        </a>
        <span className="tooltip">Settings</span>
      </li>
      <li>
        <button><img src={logoutImg} alt="my image" onClick={signOut} /></button>
      </li>
    </ul>
  </div>
  <div className="main-content">
    <div className="container" id="contentContainer">
      {userIsTeacher && (
        <TeacherSelected
        selectedPage = {selectedPage}
        />
      )}{!userIsTeacher && (
       <StudentSelected
       selectedPage = {selectedPage}
       />)}
    </div>
  </div>
</>

  );
}

export default withAuthenticator(App);