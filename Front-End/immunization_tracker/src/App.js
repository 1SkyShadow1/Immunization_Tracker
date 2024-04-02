import React, {useEffect, useState} from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Immunizations from "./Immunizations.js";
import Login from "./login.js";
import Registration from "./Registration.js";
import UserProfile from "./components/UserProfile.js" 
import Planner from "./Planner.js"
import Landing from "./components/Landing.js"


function App() {




  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/immunizations" element={<Immunizations />} />
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/planner" element={<Planner />} />
          {/* <Route path="/children" element={<Children />} />  
          <Route path="/add-child" element={<AddChild />} />  
          <Route path="/edit-child/:id" element={<EditChild />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;