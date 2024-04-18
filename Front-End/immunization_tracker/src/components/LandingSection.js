import React from 'react';
import "./LandingSection.css"

const LandingSection = () => {
  
  const sectionStyle = {
    backgroundImage: `url(./Designer.png)`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
  };
  
  
  return (
   <div>
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
 <section className="features-section">
  <div className="feature">
    <img src={process.env.PUBLIC_URL + '/profile.png'} alt="Child Profile" />
    <h2>Child Profile</h2>
    <p>Create and manage your child's profile, including their personal information and health details.</p>
  </div>
  <div className="feature">
    <img src={process.env.PUBLIC_URL + '/planner.png'} alt="Planner" />
    <h2>Planner</h2>
    <p>Plan and track your child's immunization schedule to ensure they're always up-to-date.</p>
  </div>
  <div className="feature">
    <img src={process.env.PUBLIC_URL + '/records.png'} alt="Immunization Records" />
    <h2>Immunization Records</h2>
    <p>Keep a record of all your child's immunizations for easy reference and sharing with healthcare providers.</p>
  </div>
</section>
<section className="about-section">
  <h2>About</h2>
  <p>
    Growing up, like many children in our community, we missed several crucial immunizations due to various factors. This unfortunately led to health complications that could have been prevented. Witnessing the impact of missed vaccinations firsthand fueled my desire to create a solution that empowers individuals to take control of their immunization schedules and protect their health. This project was developed as part of the Portfolio Project for <a href="https://www.holbertonschool.com/" target="_blank" rel="noopener noreferrer">ALX AFRICA</a>.
  </p>
  <h3>Team Members</h3>
  <ul>
 
   <h4>LINKEDIN</h4>

      <li>
      <a href="https://www.linkedin.com/in/member1" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/evans-ncube-b3a4a322a/</a>,
      </li>
      <li>
      <a href="https://www.linkedin.com/in/member1" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/jonathan-ndawula-baa819137</a>,
      </li>
      
      <h4>GITHUB</h4>
      
      <li>
      <a href="https://github.com/member1" target="_blank" rel="noopener noreferrer">https://github.com/1SkyShadow1</a>
      </li>
     <li>
      <a href="https://github.com/member1" target="_blank" rel="noopener noreferrer">https://github.com/JonaNdawula</a>
     </li>
  </ul>
  <h3>Project Repository</h3>
  <p>
    <a href="https://github.com/1SkyShadow1/Immunization_Tracker" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
  </p>
</section>
    </div>
  );
};

export default LandingSection;