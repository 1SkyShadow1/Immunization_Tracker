import React, { useState, useEffect } from "react";
import axios from "axios";
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import CtaSection from './components/CtaSection';
import "./styles/global.css";

function Home() {
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
    <>
     
      
      <AboutSection />
      <FeaturesSection />
      <CtaSection />
      
    </>
  );
}

export default Home;