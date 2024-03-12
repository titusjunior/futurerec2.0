import React, { useState } from 'react';
import AddUserComponent from './AddUser';
import OrganizeClasses from './SetUpClasses';
import PopulateCareerDB from './PopulateCareersDB';
import PopulateMajorsDB from './PopulateMajorsDB'

function AdminComponent({selectedPage}) {

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

                {selectedPage === 'Add User' && (
                    <AddUserComponent/>    
                )}
                {selectedPage === 'Set Classes' && (
                    <OrganizeClasses/>
                )}
                {selectedPage === 'Majors' && (
                    <PopulateMajorsDB/>
                )}
                {selectedPage === 'Careers' && (
                    <PopulateCareerDB/>
                )}
            </div>
        </>

    );

}
export default AdminComponent;