import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';
import "../../App.css";

function PopulateCareerDB (){

    const [classes, setClasses] = useState([]);
    const [AvailableClassesForRequirement, setAvailableClassesForRequirement] = useState([]);

    const [selectedcareer, setSelectedCareer] = useState('');
    const [careers, setCareers] = useState([]);
    const [newCareer, setNewCareer] = useState('');
    
    const [careerRequirements, setCareerRequirements] = useState([]);
    const [newClassRequirement, setNewClassRequirement] = useState('');
    const [newGradeRequirement, setNewMinGradeRequirement] = useState('');

    const [displayRequirements, setDisplayRequirements] = useState(false);

    const[addCareerErrorMessage, setAddCareerErrorMessage] = useState('');
    const[addRequirementErrorMessage, setAddRequirementErrorMessage] = useState('')

    useEffect(() => {
        const fetchCareers = async () => {
          try {
            const careerList = await helper.getListOfAllCareers();
            console.log("career list", careerList);
            if (careerList) {
              const sortedCareer = careerList.sort((a, b) => a.name.localeCompare(b.name));
              setCareers(sortedCareer);
            }
          } catch (error) {
            console.error("Error fetching Careers:", error);
          }
        };
    
        fetchCareers();
    }, []);


    const handleAddCareer = async () => {
      try {
        //Prevent User from entering a blank Career Name
        if (newCareer.trim() === '') {
          setAddCareerErrorMessage("Cannot add a blank career name");
          console.log("Cannot add a blank Career name");
          return;
        }
        setAddCareerErrorMessage('');
        console.log("career name:", newCareer);
        const careerDetail = await helper.createCareer(newCareer);
        console.log("New career created:", careerDetail);
        setCareers(prevCareers => [...prevCareers, careerDetail]);
        setNewCareer('');
      } catch (error) {
        console.error("Error adding new Career:", error);
      }
    };

    const handleCareerClick = async (careerId) => {
        try {
          const careerDetail = await helper.getCareer(careerId)
          setSelectedCareer(careerDetail);
          const requirementsList = await helper.getListOfCareerRequirementsForCareer(careerId);
          console.log("career clicker - reqs: ",requirementsList);
          setCareerRequirements(requirementsList);

          const currentClassesAvailable = await helper.getListOfAllClasses();
          setClasses(currentClassesAvailable);
          console.log("classes: ", currentClassesAvailable);


            //get list of class req not already there available classes
            const unAvailableClasses = requirementsList.map(req => req.classRequirement.toLowerCase());
            const availableClasses = currentClassesAvailable
                .filter(classObj => !unAvailableClasses.includes(classObj.subject.toLowerCase()))
                .map(classObj => classObj.subject);

            console.log("Available classes: ", availableClasses);
            
            setAvailableClassesForRequirement(availableClasses);

          setDisplayRequirements(true);
          console.log("career clicked",careerDetail);
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
    };
   
    const handleMinGradeInputKeyDown = async (event) => {
      if (event.key === 'Enter' || event.type === 'blur') {
        try {
        } catch (error) {
          console.error("Error setting minimum Grade:", error);
        }
      }
    };

    const handleAddNewReqirement = async () => {
        try { 
            //Prevent User from entering a blank Student
            if(newClassRequirement.trim() === '' && newGradeRequirement.trim() === ''){
              setAddRequirementErrorMessage("Cannot add a blank Entry");
              console.log("Cannot Add a blank entries");
              return;
            }else if (newClassRequirement.trim() === '') {
              setAddRequirementErrorMessage("Ensure You select a Class Requirement");
              console.log("Cannot Add with blank Class Requirement entry");
              return;
            }else if (newGradeRequirement.trim() === '') {
                setAddRequirementErrorMessage("Ensure You enter a grade");
                console.log("Cannot Add with blank grade Requirement entry");
                return;
            }
            setAddRequirementErrorMessage('');

            const newRequirement = await helper.createCareerRequirement(selectedcareer.id, newClassRequirement, newGradeRequirement);     
            setCareerRequirements([...careerRequirements, newRequirement]);

            setAvailableClassesForRequirement(AvailableClassesForRequirement
              .filter(className => className.toLowerCase() !== newClassRequirement.toLowerCase()));

            setNewClassRequirement('');
            setNewMinGradeRequirement('');
          } catch (error) {
            console.error("Error adding new requirement:", error);
          }
    };

    const handleSaveReqirement = async () => {
      setSelectedCareer('');
      setNewClassRequirement('');
      setNewMinGradeRequirement('');
      setDisplayRequirements(false);
    }



    return (
        <>
            {!displayRequirements && (
                <>
                <div>
                    <h2>Current Careers:</h2>
                    {careers.map(career => (
                    <div key={career.id}>
                        <button onClick={() => handleCareerClick(career.id)}>{career.name}</button>
                    </div>
                    ))}
                    <div>
                    <input
                        type="text"
                        placeholder="New Career name"
                        value={newCareer}
                        onChange={(e) => setNewCareer(e.target.value)}
                    />
                    <button className='student-button' onClick={handleAddCareer}>Add Career</button>
                    {addCareerErrorMessage && <p className="error-message">{addCareerErrorMessage}</p>}
                    </div>
                </div>
                </>
            )}
            {displayRequirements && (
                <>
                    <h2>Set Requirements for {selectedcareer.name}:</h2>
                    <br /> {/*Adds Space betwwe the two*/}
                    <h3 style={{ textDecoration: 'underline' }}>Current Requirements:</h3>
                    {careerRequirements.map(requirements => (
                    <div key={requirements.id} style={{ marginTop: '5px'}}>
                        <p><strong>Class:</strong> {requirements.classRequirement}</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;- Minimum Grade: {requirements.minimumGradeRequirement}</p>
                    </div>
                    ))}
                    <br /> {/*Adds Space betwwe the two*/}
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

                    <button className='student-button' onClick={handleAddNewReqirement}>Add New Requirement</button> 
                    <br /> {/*Adds Space betwwe the two*/} 
                    <div><button className='save-button' onClick={handleSaveReqirement}>Done</button></div>               
                </>
            )}
        </>
      );
    }




export default PopulateCareerDB