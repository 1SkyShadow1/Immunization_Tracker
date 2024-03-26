
import React, { useState, useEffect } from "react";
import axios from "axios";


function Immunizations() {
  const [immunizations, setImmunizations] = useState([]);

  useEffect(() => {
    axios.get("/immunizations")
      .then(res => {
        setImmunizations(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Immunizations</h2>
      <ul>
        {immunizations.map(immunization => (
          <li key={immunization.id}>{immunization.name} - {immunization.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default Immunizations;
