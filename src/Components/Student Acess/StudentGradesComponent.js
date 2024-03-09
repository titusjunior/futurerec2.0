import React, { useState, useEffect } from 'react';
import * as helper from '../helperfunctions';

function GradesComponent({grades, setGrades, setSelectedClass, selectedClass, setDisplayGrades}){

    const handleBackToClassesClick = () => {
        setSelectedClass(null);
        setGrades([]);
        setDisplayGrades(false);
      };


    return(
        <>
            <button className='back-button' onClick={handleBackToClassesClick}>&#8592;Back to Classes</button>
            <h3 style={{ marginTop: '20px' }}>Current Grades For {selectedClass.subject}:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Description</th> 
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map(grade => (
                        <tr key={grade.id}>
                            <td>{grade.description}</td>
                            <td>{grade.score}</td>  
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default GradesComponent;