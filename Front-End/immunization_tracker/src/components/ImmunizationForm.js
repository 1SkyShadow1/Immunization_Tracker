import React, { useState } from "react";
import "./ImmunizationForm.css";
const ImmunizationForm = () => {
  const [formData, setFormData] = useState({
    vaccineName: "",
    dateAdministered: "",
    doseNumber: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make a request to your backend to save the immunization data
    console.log("Immunization data submitted successfully!");
  };

  return (
    <form className="immunization-form" onSubmit={handleSubmit}>
      <label htmlFor="vaccineName">Vaccine Name:</label>
      <input type="text" name="vaccineName" value={formData.vaccineName} onChange={handleChange} />

      <label htmlFor="dateAdministered">Date Administered:</label>
      <input type="date" name="dateAdministered" value={formData.dateAdministered} onChange={handleChange} />

      <label htmlFor="doseNumber">Dose Number:</label>
      <input type="number" name="doseNumber" value={formData.doseNumber} onChange={handleChange} />

      <label htmlFor="notes">Notes:</label>
      <textarea name="notes" value={formData.notes} onChange={handleChange} />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default ImmunizationForm;