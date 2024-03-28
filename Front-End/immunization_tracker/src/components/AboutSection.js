import React from 'react';
import "./AboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-text">
          <h2 className="about-heading">About Immunization Tracker</h2>
          <p className="about-paragraph">
            Immunization Tracker is the easiest way to keep track of your child's immunizations. With Immunization Tracker, you can:
          </p>
          <ul className="about-list">
            <li>Track all of your child's immunizations in one place.</li>
            <li>Get reminders when your child's next immunization is due.</li>
            <li>Share your child's immunization records with your doctor or other caregivers.</li>
          </ul>
          <p className="about-paragraph">
            Immunization Tracker is free to use and available on the web and mobile devices.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;