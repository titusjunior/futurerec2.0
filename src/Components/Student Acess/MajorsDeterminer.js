import React, { useState } from 'react';
import * as helper from '../helperfunctions';

function DetermineMajorPath({studentID}){
    const [allMajorPaths, setAllMajorPaths] = useState([]);
    const [studentClassAverages, setStudentClassAverages] = useState([]);
    const StudentMajorPaths = [];

    useEffect(() => {
        const fetchAllMajorPaths = async () => {
            try{
                const majorPaths = await helper.getListOfAllMajors();
                setAllMajorPaths(majorPaths);
            } catch(error) {
                console.error("Error fetching available students:", error);
            }
        };
        GetAllClassAverages();
    }, []);

    const GetAllClassAverages = async () =>{
        try{
            const classAverages = await helper.getstudentClassAverages(studentID);
            setStudentClassAverages(classAverages);
            console.log("his average: ", classAverages);
        } catch (error) {
            console.error("Error fetching all Class Averages:", error);
        }
    }

    const AssignMajorsPaths = async() => {
        const associatedMajors = majorPaths.filter(major => {
            const meetsAllMajorRequirements = major.majorRequirements.every(majorReq =>
                majorPaths.some(classInfo =>
                    classInfo.classInfo.subject === classReq.subject && classInfo.avgGrade >= classReq.minGrade
                    )
                );
                return meetsAllMajorRequirements;
        });
        return associatedMajors.map(major => major.name);
    }

}

export default DetermineMajorPath;