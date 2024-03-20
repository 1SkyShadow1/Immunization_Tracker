

import React, { useState } from "react";
import axios from "axios";

function AddImmunization() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const immunization = {
      name: name,
      date: date
    };

    axios.post("/immunizations", immunization)
      .then(res => {
        console.log(res);
        setName("");
        setDate("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Add Immunization</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <br />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default AddImmunization;

