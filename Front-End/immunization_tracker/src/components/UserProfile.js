import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, childImage: imageFile }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make a request to your backend to save the user profile data
    console.log("User profile data submitted successfully!");
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

        <label htmlFor="childImage">Child's Image</label>
        <input type="file" name="childImage" onChange={handleImageChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserProfile;