import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./FeaturesSection.css";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
          <div className="feature-item">
            <div className="feature-title">Track all of your child's immunizations in one place.</div>
            <div className="feature-description">
              With Immunization Tracker, you can easily track all of your child's immunizations in one place. This makes it easy to see which immunizations your child has received, when they were received, and when the next immunization is due.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-title">Get reminders when your child's next immunization is due.</div>
            <div className="feature-description">
              Immunization Tracker will send you reminders when your child's next immunization is due. This helps you stay on top of your child's immunization schedule and ensures that your child gets the immunizations they need on time.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-title">Share your child's immunization records with your doctor or other caregivers.</div>
            <div className="feature-description">
              With Immunization Tracker, you can easily share your child's immunization records with your doctor or other caregivers. This makes it easy to keep everyone up-to-date on your child's immunization status.
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturesSection;