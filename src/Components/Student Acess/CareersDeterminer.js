import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';



function DetermineCareerPath({studentID}){    
    const [allCareers, setAllCareers] = useState([]);
    const [studentClassAverages, setStudentClassAverages] = useState([]);
    const [PossibleCareerPaths, setPossibleCareerPaths] = useState([]);

    useEffect(() => {
        const GetAllClassAverages = async () =>{
            try {
                const classAverages = await helper.getstudentClassAverages(studentID);
                setStudentClassAverages(classAverages);
                console.log("his averages: ", classAverages);
            } catch (error) {
                console.error("Error fetching all Class Averages:", error);
            }
        }
        GetAllClassAverages();

    },[]);

    useEffect(() => {
        const fetchCareersWithRequirements = async() =>{
            try {
                const careerList = await helper.getListOfAllCareers();
                const sortedCareers = careerList.sort((a, b) => a.name.localeCompare(b.name));
    
                const modifiedCareerList = await Promise.all( sortedCareers.map( async careerInfo =>{
                    const classRequirements = await helper.getListOfCareerRequirementsForCareer(careerInfo.id);
                    return {careerInfo, classRequirements};
                }));
    
                setAllCareers(modifiedCareerList);
                console.log("career list", modifiedCareerList);
            } catch (error) {
                console.error("Error fetching Careers", error);
            }  
       };
                
        fetchCareersWithRequirements();
    }, []);

    
    useEffect(() => {
        const AssignCareerPaths = () => {
            console.log("Assigning career paths...");
        
            const filteredCareers = allCareers.filter(career => {
                const matchedRequirements = career.classRequirements.filter(requirement => {
                    const matchedSubject = studentClassAverages.find(studinfo => studinfo.subject.toLowerCase() === requirement.classRequirement.toLowerCase());
                    if (!matchedSubject) {
                        console.log(`Subject ${requirement.classRequirement} not found in studentClassAverages for career ${career.careerInfo.name}`);
                        return false;
                    }
        
                    const meetsMinimumGrade = matchedSubject.avgGrade >= requirement.minimumGradeRequirement;
                    if (!meetsMinimumGrade) {
                        console.log(`Student's grade for ${requirement.classRequirement} is below minimum requirement for career ${career.careerInfo.name}`);
                    }
        
                    return meetsMinimumGrade;
                });
        
                if (matchedRequirements.length === career.classRequirements.length) {
                    console.log(`All requirements met for career ${career.careerInfo.name}`);
                    return true;
                } else {
                    console.log(`Not all requirements met for career ${career.careerInfo.name}`);
                    return false;
                }
            });
    
            setPossibleCareerPaths(filteredCareers);
            console.log("Applicable careers: ", filteredCareers);
        };
    
        AssignCareerPaths();
    },[allCareers, studentClassAverages]);

    return (
        <>
            <h2>Possible Career Paths:</h2>
            <h4>
                {PossibleCareerPaths.map(career => (
                    <li key={career.careerInfo.id}>{career.careerInfo.name}</li>
                ))}
            </h4>
        </>
    );
   


}

export default DetermineCareerPath;