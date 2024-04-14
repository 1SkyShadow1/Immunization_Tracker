import { useLocation } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Home from "./Home";
import Login from "./login.js";
import Registration from "./Registration.js";
import UserProfile from "./components/ChildProfile.js" 
import Planner from "./Planner.js"
import Landing from "./components/Landing.js"
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Immunizations from "./components/Immunizations.js";
import ImmunizationRecords from "./components/ImmunizationRecords.js";
import { Routes, Route } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  const hideSidebar = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <>
      <Header />
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/immunizations" element={<Immunizations  />} />
        <Route path="/planner" element={<Planner />} />
        <Route path = "/immunizationRecords" element = {<ImmunizationRecords />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;