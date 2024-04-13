import React, { useState, useEffect } from "react";
import axios from "axios";
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import CtaSection from './components/CtaSection';
import "./styles/global.css";

function Home() {


  return (
    <div >
      <AboutSection />
      <FeaturesSection />
      <CtaSection />
      
    </div>
  );
}

export default Home;