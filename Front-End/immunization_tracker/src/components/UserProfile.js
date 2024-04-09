import React, { useState} from "react";
import axios from 'axios';
import "./UserProfile.css";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    childName: "",
    dateOfBirth: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childImage: null,
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user_id = window.sessionStorage.getItem('user_id');
  //     const response = await axios.post('http://localhost:5000/user-profile', {user_id, ...formData});
  //     if (response.data.success) {
  //       setMessage('User profile data submitted successfully!');
  //     } else {
  //       setMessage('Failed to update profile: ' + (response.data.message || 'Unknown error'));
  //     }
  //   } catch (error) {
  //     setMessage('An error occurred while updating the profile: ' + error.message);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const user_id = window.sessionStorage.getItem('user_id');
    const formDataObj = {user_id, ...formData};
    const data = new FormData();
    for (const key in formDataObj) {
      data.append(key, formDataObj[key]);
    }
    const response = await axios.post('http://localhost:5000/user-profile', data);
    if (response.data.success) {
      setMessage('User profile data submitted successfully!');
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
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default UserProfile;