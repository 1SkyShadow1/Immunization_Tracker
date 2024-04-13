import React, { useState } from "react";
import axios from 'axios';
import './UserProfile.css';
import Immunizations from "./Immunizations";

const ChildProfile = () => {
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
  });
  const [message, setMessage] = useState(null);
  const [profile_id, setProfileId] = useState(null); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user_id = window.sessionStorage.getItem('user_id');
      const response = await axios.post('http://localhost:5000/child-profile', {
        user_id,
        childName: formData.childName,
        dateOfBirth: formData.dateOfBirth,
        parentName: formData.parentName,
        parentEmail: formData.parentEmail,
        parentPhone: formData.parentPhone,
      });

      if (response.data.success) {
        setMessage('Child profile data submitted successfully!');
        setProfileId(response.data.profile_id); 
        setFormData({
          childName: '',
          dateOfBirth: '',
          parentName: '',
          parentEmail: '',
          parentPhone: '',
          
        });
      } else {
        setMessage('Failed to update profile: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while updating the profile: ' + error.message);
    }
  };

  return (
    <div className="user-profile-form">
      <h3>Child Profile</h3>
      <form className="form-unit" onSubmit={handleSubmit}>
        <label htmlFor="childName">Child's Name</label>
        <input type="text" name="childName" value={formData.childName} onChange={handleChange} />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

        <label htmlFor="parentName">Parent's Name</label>
        <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} />

        <label htmlFor="parentEmail">Parent's Email</label>
        <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} />

        <label htmlFor="parentPhone">Parent's Phone Number</label>
        <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
      {profile_id && <Immunizations profile_id={profile_id}  />}
      </div>
  );
};

export default ChildProfile;