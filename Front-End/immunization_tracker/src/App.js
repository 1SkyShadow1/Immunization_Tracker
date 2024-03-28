import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Immunizations from "./Immunizations.js";
import AddImmunization from "./AddImmunization";
import Login from "./login.js";
import Registration from "./Registration.js";
import UserProfile from "./components/UserProfile.js" 
import Planner from "./Planner.js"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/immunizations" element={<Immunizations />} />
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-immunization" element={<AddImmunization />} />
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