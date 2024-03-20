import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Immunizations from "./Immunizations";
import AddImmunization from "./AddImmunization";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/immunizations" element={<Immunizations />} />
          <Route path="/add-immunization" element={<AddImmunization />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;