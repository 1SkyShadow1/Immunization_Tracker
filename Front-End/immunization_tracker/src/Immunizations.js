import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
//import { verifyJWT } from '/verifyJWT';
import axios from 'axios';
import "./Immunizations.css";

const Immunizations = () => {
  const [immunizations, setImmunizations] = useState([]);
  const [childId, setChildId] = useState('');
  const [vaccineName, setVaccineName] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token || !verifyJWT(token)) {
      navigate('/login');
      return;
    }

    // Get the user ID from the JWT
    const userId = verifyJWT(token).userId;

    // Get the child ID from the URL
    const childId = location.pathname.split('/')[2];
    setChildId(childId);

    // Get the immunizations for the child
    axios.get(`/immunizations?childId=${childId}`)
      .then(res => {
        setImmunizations(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (!childId || !vaccineName || !dateAdministered || !nextDueDate) {
      alert('Please fill out all required fields');
      return;
    }

    // Create the immunization object
    const immunization = {
      childId,
      vaccineName,
      dateAdministered,
      nextDueDate,
      notes,
    };

    // Add the immunization to the database
    try {
      await axios.post('/immunizations', immunization);
      setImmunizations([...immunizations, immunization]);
      alert('Immunization added successfully');
    } catch (err) {
      console.error(err);
      alert('Error adding immunization');
    }
  };

  return (
    <div className="immunizations-container">
      <h1>Immunizations</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="childId">Child ID:</label>
        <input type="text" name="childId" value={childId} onChange={(e) => setChildId(e.target.value)} />

        <label htmlFor="vaccineName">Vaccine Name:</label>
        <input type="text" name="vaccineName" value={vaccineName} onChange={(e) => setVaccineName(e.target.value)} />

        <label htmlFor="dateAdministered">Date Administered:</label>
        <input type="date" name="dateAdministered" value={dateAdministered} onChange={(e) => setDateAdministered(e.target.value)} />

        <label htmlFor="nextDueDate">Next Due Date:</label>
        <input type="date" name="nextDueDate" value={nextDueDate} onChange={(e) => setNextDueDate(e.target.value)} />

        <label htmlFor="notes">Notes:</label>
        <textarea name="notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>

        <button type="submit">Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Vaccine Name</th>
            <th>Date Administered</th>
            <th>Next Due Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {immunizations.map(immunization => (
            <tr key={immunization.id}>
              <td>{immunization.vaccineName}</td>
              <td>{immunization.dateAdministered}</td>
              <td>{immunization.nextDueDate}</td>
              <td>{immunization.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Immunizations;