import React from 'react';
import "./LandingSection.css"


const LandingSection = () => {
  
  const sectionStyle = {
    backgroundImage: `url(./Designer.png)`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
  };
  
  
  return (
    <section className="landing-section" style={sectionStyle}>
      <div className="container">
        <div className="landing-text">
          <ul className="landing-list">
            <li className="list-item">Track all of your child's immunizations in one place.</li>
            <li className="list-item">Get reminders when your child's next immunization is due.</li>
            <li className="list-item">Share your child's immunization records with your doctor or other caregivers.</li>
          </ul>
          <br/>
          <a href="/login" className="btn btn-primary">Get started today!</a>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;