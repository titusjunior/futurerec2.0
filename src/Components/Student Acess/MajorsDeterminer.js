import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';

function DetermineMajor({studentID}){    
    const [allMajors, setAllMajors] = useState([]);
    const [studentClassAverages, setStudentClassAverages] = useState([]);
    const [PossibleMajors, setPossibleMajors] = useState([]);

    useEffect(() => {
        const GetAllClassAverages = async () =>{
            try {
                const classAverages = await helper.getstudentClassAverages(studentID);
                setStudentClassAverages(classAverages);
                console.log("their averages: ", classAverages);
            } catch (error) {
                console.error("Error fetching all Class Averages:", error);
            }
        }
        GetAllClassAverages();

    },[]);

    useEffect(() => {
        const fetchMajorsWithRequirements = async() =>{
            try {
                const majorList = await helper.getListOfAllMajors();
                const sortedMajors = majorList.sort((a, b) => a.name.localeCompare(b.name));
    
                const modifiedMajorList = await Promise.all( sortedMajors.map( async majorInfo =>{
                    const classRequirements = await helper.getListOfMajorRequirementsForMajor(majorInfo.id);
                    return {majorInfo, classRequirements};
                }));
    
                setAllMajors(modifiedMajorList);
                console.log("major list", modifiedMajorList);
            } catch (error) {
                console.error("Error fetching majors", error);
            }  
       };
                
        fetchMajorsWithRequirements();
    }, []);

    
    useEffect(() => {
        const AssignMajors = () => {
            console.log("Assigning majors...");
        
            const filteredMajors = allMajors.filter(major => {
                const matchedRequirements = major.classRequirements.filter(requirement => {
                    const matchedSubject = studentClassAverages.find(studinfo => studinfo.subject.toLowerCase() === requirement.classRequirement.toLowerCase());
                    if (!matchedSubject) {
                        console.log(`Subject ${requirement.classRequirement} not found in studentClassAverages for major ${major.majorInfo.name}`);
                        return false;
                    }
        
                    const meetsMinimumGrade = matchedSubject.avgGrade >= requirement.minimumGradeRequirement;
                    if (!meetsMinimumGrade) {
                        console.log(`Student's grade for ${requirement.classRequirement} is below minimum requirement for major ${major.majorInfo.name}`);
                    }
        
                    return meetsMinimumGrade;
                });
        
                if (matchedRequirements.length === major.classRequirements.length) {
                    console.log(`All requirements met for major ${major.majorInfo.name}`);
                    return true;
                } else {
                    console.log(`Not all requirements met for major ${major.majorInfo.name}`);
                    return false;
                }
            });
    
            setPossibleMajors(filteredMajors);
            console.log("Applicable majors: ", filteredMajors);
        };
    
        AssignMajors();
    },[allMajors, studentClassAverages]);

    return (
        <>
        <div className="majors">
            <h2>Possible Majors:</h2>
            <br></br>
            <h4>
                {PossibleMajors.map(major => (
                    <li key={major.majorInfo.id}>{major.majorInfo.name}</li>
                ))}
            </h4>
        </div>
        </>
    );
   


}

export default DetermineMajor;