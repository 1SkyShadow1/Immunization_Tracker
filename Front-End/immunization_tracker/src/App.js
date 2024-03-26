import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Immunizations from "./Immunizations.js";
import AddImmunization from "./AddImmunization";
import Login from "./login.js";
import Registration from "./Registration.js";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/immunizations" element={<Immunizations />} />
          <Route path="/add-immunization" element={<AddImmunization />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;