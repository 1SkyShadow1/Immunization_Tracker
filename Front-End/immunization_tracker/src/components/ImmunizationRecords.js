import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImmunizationRecords = () => {
    const [immunizations, setImmunizations] = useState([]);

    useEffect(() => {
        const fetchImmunizations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/immunizations`);
                setImmunizations(response.data);
            } catch (error) {
                console.error('Error fetching immunization records:', error);
            }
        };

        fetchImmunizations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/immunizations/${id}`);
            setImmunizations(immunizations.filter(immunization => immunization.id !== id));
        } catch (error) {
            console.error('Error deleting immunization record:', error);
        }
    }

    const handleUpdate = (id) => {
        // history.push(`/update/${id}`);
    }

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
                                <button onClick={() => handleDelete(immunization.immunization_id)}>Delete</button>
                                <button onClick={() => handleUpdate(immunization.immunization_id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ImmunizationRecords;