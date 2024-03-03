import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "./App.css";
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect, useState } from 'react';

import TeacherComponent from './Components/TeacherComponent';
import ClassComponent from './Components/ClassCompnent';
import StudentComponent from './Components/Student&GradeComponent';

import config from './aws-exports';


import profileImg from "./profile.jpg";
import logoutImg from "./logout.jpg";
//import { signOut } from 'aws-amplify/auth';
//import { getCurrentUser } from 'aws-amplify/auth';
//import { fetchUserAttributes } from 'aws-amplify/auth';

Amplify.configure(config);





function App({signOut, user}) {
    //const [full_name, setFullName] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [displayClasses, setDisplayClasses] = useState(false);
    const [classes, setClasses] = useState([]);
    
    const [selectedClass, setSelectedClass] = useState(null);
      
    const [students, setStudents] = useState([]);
    
    const [allGradeDescriptions,setAllGradeDescriptions] = useState([]);

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
       
        fetchUserData();
      }, []);

  /*  async function handleSignOut() {
    try {
        await signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
    }*/

    async function changeContent(pageName){
    try {
        //var content = await fetchContentForPage(pageName);
        //document.getElementById('contentContainer').innerHTML = content;
        //get the page based on the clicked link
        setSelectedPage(pageName);
    } catch (error) {
        console.error('Error changing content: ', error);
    }
    }

    async function fetchContentForPage(pageName){
    try {
        switch(pageName){
        case 'Home':
            return '<h1>Home</h1>';
        case 'Grades':
            return '<h1>Grades</h1>';
        case 'Tutoring':
            return '<h1>Tutoring</h1>';
        case 'FutureRec':
            return '<h1>FutureRec</h1>';
        case 'Majors':
            return '<h1>Majors</h1>';
        case 'Careers':
            return '<h1>Careers</h1>';
        case 'Settings':
            return '<h1>Settings</h1>';
        case 'Logout':
            return '<h1>Logout</h1>';
        default:
            return '<h1>Home</h1>';
        }
    } catch (error) {
        console.error('Error fetching content for page: ', error);
        return '<h1>Error loading content</h1>';
    }
    }

/*
  async function fetchUserData() {
    try {
      const userInfo = await fetchUserAttributes(getCurrentUser()); // Get authenticated user info
      setFullName(userInfo.name + " " + userInfo.family_name);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }*/

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
       {/* Conditional rendering based on selected page */}
       {selectedPage === 'Home' && <h1>Home</h1>}
          {selectedPage === 'Grades' && (
            <>
              <TeacherComponent 
                setSelectedTeacher={setSelectedTeacher} 
                setClasses={setClasses} 
                setDisplayClasses={setDisplayClasses} 
                classes={classes}
               />
              {selectedTeacher && displayClasses && (
                <ClassComponent 
                setDisplayClasses={setDisplayClasses}
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
              {selectedClass && (
               <StudentComponent
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
          {/* Render other pages similarly */} 
    </div>
  </div>
</>

  );
}

export default withAuthenticator(App);