import React, { useState, useEffect } from "react";
import axios from 'axios';
import './UserProfile.css';
import { Link } from 'react-router-dom';

const Immunizations = () => { 
  const [formData, setFormData] = useState({
    profile_id: '',
    user_id: '',
    child_name: '',
    vaccine_name: '',
    date_administered: '',
    next_due_date: '',
    doctor_name: '',
    notes: '', 
  });
  const [message, setMessage] = useState(null);
  const [profileIds, setProfileIds] = useState([]);
  const [childNames, setChildNames] = useState([]);
  

  useEffect(() => {
    const user_id = window.sessionStorage.getItem('user_id'); 
    if (user_id) {
        setFormData(prevData => ({
          ...prevData,
          user_id: parseInt(user_id, 10)
        }));

        const fetchChildProfiles = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/childprofile/${user_id}`);
                if (response.data.children && Array.isArray(response.data.children)) {
                    const profileIds = response.data.children.map(profile => profile.profile_id);
                    const childNames = response.data.children.map(profile => profile.childName);
                    setProfileIds(profileIds);
                    setChildNames(childNames);


                } else {
                    console.error('Unexpected response data structure: ' + JSON.stringify(response.data));
                }
            } catch (error) {
                console.error('Error fetching child profiles: ' + error.message);
            }
        };

        fetchChildProfiles();
    }
}, []); 
  
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: name === 'profile_id' ? parseInt(value, 10) : value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profile_id ) {
      alert('Please select a profile.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/childprofile/${formData.profile_id}`);
      if (response.data.profile_id) {
        setMessage('This profile ID is already registered for a child.');
        return;
      }
    } catch (error) {
      console.error('Error checking for existing profile ID:', error);
      setMessage('An error occurred while checking for existing profile ID.');
      return;
    }
  


    try {
      const response = await axios.post('http://localhost:5000/immunizations', formData);
        console.log(response.data);
      if (response.data.id) {
        setMessage('Immunization data submitted successfully!');
        setFormData({
          profile_id: '',
          user_id: '',
          child_name: '',
          vaccine_name: '',
          date_administered: '',
          next_due_date: '',
          doctor_name: '',
          notes: '',
           
        });
      } else {
        setMessage('Failed to update immunization: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while updating the immunization: ' + error.message);
    }
  };

  return (
    <div className="user-profile-form">
      <h3>Immunization Form</h3>
      <form className="form-unit" onSubmit={handleSubmit}>
      <label htmlFor="profile_id">Profile ID</label>
<select name="profile_id" value={formData.profile_id} onChange={handleChange}>
  <option value="">Select Id</option>
  {profileIds.map((id) => (
    <option key={id} value={id}>
      {id}
    </option>
  ))}
</select>

<label htmlFor="child_name">Child Name</label>
<select name="child_name" value={formData.child_name} onChange={handleChange}>
 <option value="">Select a child</option>
{childNames.map((name) => (
    <option key={name} value={name}>
      {name}
    </option>
  ))}
</select>

        <label htmlFor="vaccine_name">Vaccine Name</label>
        <input type="text" name="vaccine_name" value={formData.vaccine_name} onChange={handleChange} />

        <label htmlFor="date_administered">Date Administered</label>
        <input type="date" name="date_administered" value={formData.date_administered} onChange={handleChange} />

        <label htmlFor="next_due_date">Next Due Date</label>
        <input type="date" name="next_due_date" value={formData.next_due_date} onChange={handleChange} />

        <label htmlFor="doctor_name">Doctor's Name</label> 
        <input type="text" name="doctor_name" value={formData.doctor_name} onChange={handleChange} />
        <label htmlFor="notes">Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
      { 
    <Link to="/immunizationRecords">
      <button className="immunization-button" type="button">View Immunization List</button>
    </Link>
      }
    </div>
  );
};

export default Immunizations;