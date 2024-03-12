import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import "../../App.css";

function PopulateMajorDB(){
    const [classes, setClasses] = useState([]);
    const [AvailableClassesForRequirement, setAvailableClassesForRequirement] = useState([]);

    const [selectedmajor, setSelectedMajor] = useState('');
    const [majors, setMajors] = useState([]);
    const [newMajor, setNewMajor] = useState('');
    
    const [majorRequirements, setMajorRequirements] = useState([]);
    const [newClassRequirement, setNewClassRequirement] = useState('');
    const [newGradeRequirement, setNewMinGradeRequirement] = useState('');

    const [displayRequirements, setDisplayRequirements] = useState(false);

    const[addMajorErrorMessage, setAddMajorErrorMessage] = useState('');
    const[addRequirementErrorMessage, setAddRequirementErrorMessage] = useState('');

    useEffect(() => {
        const fetchMajors = async () => {
            try{
                const majorList = await helper.getListOfAllMajors();
                console.log("Major List:", majorList);
                if(majorList) {
                    const sortedMajor = majorList.sort((a, b) => a.name.localeCompare(b.name));
                    setMajors(sortedMajor);
                }
            } catch(error) {
                console.error("Error fetching Majors:", error);
            }
        };

        fetchMajors();
    }, []);

    const handleAddMajor = async () => {
        try {
            if(newMajor.trim() === ''){
                setAddMajorErrorMessage("Cannot add a blank major name");
                console.log("Cannot add a blank major name");
                return;
            }
            setAddMajorErrorMessage('');
            console.log("Major name:", newMajor);
            const majorDetail = await helper.createMajor(newMajor);
            console.log("New major created:", majorDetail);
            setMajors(prevMajors => [...prevMajors, majorDetail]);
            setNewMajor('');
        } catch (error) {
            console.error("Error in adding new major:", error);
        }   
    };

    const handleMajorClick = async(majorId) => {
        try {
            const majorDetail = await helper.getMajor(majorId);
            setSelectedMajor(majorDetail);
            const requirementsList = await helper.getListOfMajorRequirementsForMajor(majorId);
            console.log("major clicker - reqs: ", requirementsList);
            setMajorRequirements(requirementsList);

            const currentClassesAvailable = await helper.getListOfAllClasses();
            setClasses(currentClassesAvailable);
            console.log("classes: ", currentClassesAvailable);

            const unAvailableClasses = requirementsList.map(req => req.classRequirement.toLowerCase());
            const availableClasses = currentClassesAvailable
                .filter(classObj => !unAvailableClasses.includes(classObj.subject.toLowerCase()))
                .map(classObj => classObj.subject);
            console.log("Avaliable classes: ", availableClasses);

            setAvailableClassesForRequirement(availableClasses);

            setDisplayRequirements(true);
            console.log("Major clicked", majorDetail);
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    const handleMinGradeInputKeyDown = async (event) => {
        if(event.key === 'Enter' || event.type === 'blur') {
            try {
            } catch (error) {
                console.error("Error setting minimum grade:", error);
            }
        }
    };

    const handleAddNewRequirement = async() => {
        try{
            if(newClassRequirement.trim() === '' && newGradeRequirement.trim === '') {
                setAddRequirementErrorMessage("Cannot add a blank entry");
                console.log("Cannot add a blank entry");
                return;
            }else if (newClassRequirement.trim() === '') {
                setAddRequirementErrorMessage("Ensure you select a class requirement");
                console.log("Cannot add with blank class requirement entry");
                return;
            } else if (newGradeRequirement.trim() === '') {
                setAddRequirementErrorMessage("Ensure you enter a grade");
                console.log("Cannot add with blank grade requirement entry");
                return;
            }
            setAddRequirementErrorMessage('');

            const newRequirement = await helper.createMajorRequirement(selectedmajor.id, newClassRequirement, newGradeRequirement);
            setMajorRequirements([...majorRequirements, newRequirement]);

            setAvailableClassesForRequirement(AvailableClassesForRequirement
                .filter(className => className.toLowerCase() !== newClassRequirement.toLowerCase()));

            setNewClassRequirement('');
            setNewMinGradeRequirement('');
        } catch (error) {
            console.error("Error adding new requirement:", error);
        }
    };

    const handleSaveRequirement = async () => {
        setSelectedMajor('');
        setNewClassRequirement('');
        setNewMinGradeRequirement('');
        setDisplayRequirements(false);
    }

    return (
        <>
            {!displayRequirements && (
                <>
                <div>
                    <h2>Current Majors:</h2>
                    {majors.map(major => (
                    <div className="classItems" key={major.id}>
                        <button onClick={() => handleMajorClick(major.id)}>{major.name}</button>
                    </div>
                    ))}
                    <div>
                        <input
                            type="text"
                            placeholder='New Major Name'
                            value={newMajor}
                            onChange={(e) => setNewMajor(e.target.value)}
                        />
                        <button className='student-button' onClick={handleAddMajor}>Add Major</button>
                        {addMajorErrorMessage && <p className="error-message">{addMajorErrorMessage}</p>}
                    </div>
                </div>
                </>
            )}
            {displayRequirements && (
                <>
                    <h2>Set Requirements for {selectedmajor.name}:</h2>
                    <br />
                    <h3 style ={{ textDecoration: 'underline' }}>Current Requirements</h3>
                    {majorRequirements.map(requirements => (
                        <div key={requirements.id} style={{marginTop: '5px'}}>
                            <p><strong>Class:</strong> {requirements.classRequirement}</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;- Minimum Grade: {requirements.minimumGradeRequirement}</p>
                        </div>
                    ))}
                    <br />
                    <div>
                        <span>New Class Requirement: </span>
                        <select value={newClassRequirement}
                            onChange={(e) => setNewClassRequirement(e.target.value)}>
                            <option value="">Select class requirement</option>
                            {AvailableClassesForRequirement.map((className, index) => (
                                <option key={index} value={className}>{className}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span>New Minimum Grade Requirement: </span>
                        <input className='short-input'
                            type="number"
                            value={newGradeRequirement}
                            onChange={(e) => setNewMinGradeRequirement(e.target.value)}
                            onKeyDown={handleMinGradeInputKeyDown}
                            onBlur={handleMinGradeInputKeyDown}
                        />
                    </div>

                    <button className='student-button' onClick={handleAddNewRequirement}>Add New Requirement</button>
                    <br />
                    <div><button className='save-button' onClick={handleSaveRequirement}>Done</button></div>
                </>
            )}
        </>
    );

}

export default PopulateMajorDB