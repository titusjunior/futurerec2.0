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
import AdminSelected from './Components/Admin/AdminAcessCode'

import config from './aws-exports'; 

Amplify.configure(config);

function App({signOut, user}) { 
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userIsTeacher, setUserIsTeacher] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Home'); // State variable to track selected page
  const [name, setName] = useState('');

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
        setUserName();

        detectUser();
        setUserName();

      }, []);

    async function changeContent(pageName){
    try {
        setSelectedPage(pageName);
    } catch (error) {
        console.error('Error changing content: ', error);
    }
    }

    async function setUserName() {
      const username = await fetchUserAttributes();
      setName(username.name);
    }

    async function detectUser() {
      const userInfo = await fetchUserAttributes();
      const user_type = userInfo["custom:user_type"]
      console.log(userInfo["custom:user_type"]);
      if(user_type == "Admin") {
        setUserIsTeacher(false);
        setUserIsAdmin(true);
      } else if(user_type == "Student") {
        setUserIsTeacher(false);
        setUserIsAdmin(false);
      } else if(user_type == "Teacher") {
        setUserIsTeacher(true);
        setUserIsAdmin(false);
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
            <p className="bold">{name}</p>
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
          {!userIsAdmin && (
            <li>
              <a href="#" onClick={() => changeContent('Grades')}>
                <i className="bx bx-bar-chart" />
                <span className="nav-item">Grades</span>
              </a>
              <span className="tooltip">Grades</span>
            </li>
          )}
          {userIsAdmin && (
            <li>
              <a href="#" onClick={() => changeContent('Add User')}>
                <i class='bx bx-user-pin'></i>
                <span className="nav-item">Users</span>
              </a>
            </li>
          )}
          {userIsAdmin && (
            <li>
              <a href="#" onClick={() => changeContent('Set Classes')}>
                <i class='bx bxs-school'></i>
                <span className="nav-item">Classes</span>
              </a>
            </li>
          )}
          {!userIsAdmin && (
            <li>
              <a href="#" onClick={() => changeContent('Tutoring')}>
                <i className="bx bxs-pencil" />
                <span className="nav-item">Tutoring</span>
              </a>
              <span className="tooltip">Tutoring</span>
            </li>
          )}
          {!userIsTeacher && (
            <li>
              <a href="#" onClick={() => changeContent('Majors')}>
                <i className="bx bxs-graduation" />
                <span className="nav-item">Majors</span>
              </a>
              <span className="tooltip">Majors</span>
            </li>
          )}
          {!userIsTeacher && (
            <li>
              <a href="#" onClick={() => changeContent('Careers')}>
                <i className="bx bxs-briefcase-alt-2" />
                <span className="nav-item">Careers</span>
              </a>
              <span className="tooltip">Careers</span>
            </li>
          )}
          
          <li>
            <button className="logout"><img src={logoutImg} alt="my image" onClick={signOut} /></button>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="container" id="contentContainer">
          {userIsAdmin && (
            <AdminSelected
            selectedPage = {selectedPage}
            />
          )}
          {!userIsTeacher && !userIsAdmin && (
            <StudentSelected
            selectedPage = {selectedPage}
            />
          )}
          {userIsTeacher && !userIsAdmin && (
            <TeacherSelected
            selectedPage = {selectedPage}
           />
          )}
        </div>
      </div>
    </>
    );
}

export default withAuthenticator(App);