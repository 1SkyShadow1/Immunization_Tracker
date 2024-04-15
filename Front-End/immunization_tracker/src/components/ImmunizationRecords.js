import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ImmunizationRecords.css";

const ImmunizationRecords = () => {
    const [immunizations, setImmunizations] = useState([]);

    useEffect(() => {
        const fetchImmunizations = async () => {
            try {
                const userId = sessionStorage.getItem('user_id'); 
                if (!userId) {
                    console.error('User ID not found in session storage');
                    return;
                }
                const parsedUserId = parseInt(userId, 10);
                if (isNaN(parsedUserId)) {
                    console.error('User ID is not a number');
                    return;
                }
                const response = await axios.get(`http://localhost:5000/immunizations/${parsedUserId}`);
                console.log('Response data:', response.data); 
                const immunizationsWithUpdatedData = response.data.map(immunization => ({
                    ...immunization,
                    updatedData: {}, // Add a new field for the updated data
                }));
                setImmunizations(immunizationsWithUpdatedData);
            } catch (error) {
                console.error('Error fetching immunization records:', error);
            }
        };

        fetchImmunizations();
    }, []);

    const handleUpdate = async (immunization_id, updatedData) => {
        console.log('Updating immunization:', immunization_id, updatedData);
    
        if (!updatedData) {
            console.error('updatedData is undefined');
            return;
        }
    
        if (updatedData.date_administered) {
            const date = new Date(updatedData.date_administered);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
            const day = String(date.getDate()).padStart(2, '0');
            updatedData.date_administered = `${year}-${month}-${day}`;
        }
    
        try {
            const response = await axios.put(`http://localhost:5000/immunizations/${immunization_id}`, updatedData);
            console.log('Response data:', response.data);
            
        
            setImmunizations(immunizations.map(immunization => immunization.immunization_id === immunization_id ? { ...immunization, ...updatedData } : immunization));
        } catch (error) {
            console.error('Error updating immunization: ', error);
        }
    };
    
    const handleDelete = async (immunization_id) => {
        console.log('Deleting immunization:', immunization_id);
    
        try {
            const response = await axios.delete(`http://localhost:5000/immunizations/${parseInt(immunization_id), 10}`);
            console.log('Response data:', response.data);
            
            setImmunizations(immunizations.filter(immunization => immunization.immunization_id !== immunization_id));
        } catch (error) {
            console.error('Error deleting immunization: ', error);
        }
    };

    return (
        <div className="immunization-records">
            <table>
                <thead>
                    <tr>
                        <th>Record ID</th>
                        <th>Child Name</th>
                        <th>Vaccine Name</th>
                        <th>Date Administered</th>
                        <th>Doctor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {immunizations.map(immunization => (
                        <tr key={immunization.immunization_id}>
                            <td>{immunization.immunization_id}</td>
                            <td>{immunization.child_name}</td>
                            <td>{immunization.vaccine_name}</td>
                            <td>{immunization.date_administered}</td>
                            <td>{immunization.doctor_name}</td>
                            <td>
                                <button className='delete-button' onClick={() => handleDelete(immunization.immunization_id)}>Delete</button>
                                <button onClick={() => handleUpdate(immunization.immunization_id, immunization.updatedData)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ImmunizationRecords;