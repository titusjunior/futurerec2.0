import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';



function DetermineCareerPath({studentID}){

    //have a helper function that sets all the class grade and 
    
    const [allCareerPaths, setAllCareerPaths] = useState([]);
    const [studentClassAverages, setStudentClassAverages] = useState([]);
    const StudentCareerPaths = [];

    //could think about storing these in the database(min grade, required subjects, associated with their grade)
    const careerPaths = [
        { 
            name: "Software Engineer", 
            classRequirements: [
                { subject: "Math", minGrade: 85 },
                { subject: "Computer Science", minGrade: 85 }
            ]
        },
        { 
            name: "Doctor", 
            classRequirements: [
                { subject: "Biology", minGrade: 90 },
                { subject: "Chemistry", minGrade: 90 }
            ]
        },
        { 
            name: "Mechanical Engineer", 
            classRequirements: [
                { subject: "Math", minGrade: 80 },
                { subject: "Physics", minGrade: 80 }
            ]
        },
        // Add more career paths as needed
    ];


    useEffect(() => {
        const fetchAllCareerPaths = async () => {
          try {
            const careerPaths = await helper.getListOfAllCareers();
            setAllCareerPaths(careerPaths);            
          } catch (error) {
            console.error("Error fetching available students:", error);
          }
        };

        
        //fetchAllCareerPaths;
        GetAllClassAverages();
    }, []);
    
    const GetAllClassAverages = async () =>{
        try {
            const classAverages = await helper.getstudentClassAverages(studentID);
            setStudentClassAverages(classAverages);
            console.log("his avaerage: ", classAverages);
        } catch (error) {
            console.error("Error fetching all Class Averages:", error);
        }
    }

      
      //look into filtering
    
    
    
      const AssignCareerPaths = async() => {

     // Filter career paths based on the student's grades per class and subjects taken
    const associatedCareers = careerPaths.filter(career => {
        // Check if the student meets the minimum grade requirement for each class in the career path
        const meetsAllClassRequirements = career.classRequirements.every(classReq =>
            careerPaths.some(classInfo =>
                classInfo.classInfo.subject === classReq.subject && classInfo.avgGrade >= classReq.minGrade
            )
        );
        
        return meetsAllClassRequirements;
    });

    return associatedCareers.map(career => career.name);

    }





   


}

export default DetermineCareerPath;