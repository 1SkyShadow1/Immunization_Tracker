import React from 'react';
import "./LandingSection.css"

const LandingSection = () => {
  return (
    <section className="landing-section">
      <div className="container">
        <div className="landing-text">
          <h1>Immunization Tracker</h1>
          <p>Immunization Tracker is the easiest way to keep track of your child's immunizations.</p>
          <ul>
            <li>Track all of your child's immunizations in one place.</li>
            <li>Get reminders when your child's next immunization is due.</li>
            <li>Share your child's immunization records with your doctor or other caregivers.</li>
          </ul>
          <a href="/home" className="btn btn-primary">Get started today!</a>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;