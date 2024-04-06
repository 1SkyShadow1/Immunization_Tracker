import { useLocation } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Home from "./Home";
import Login from "./login.js";
import Registration from "./Registration.js";
import UserProfile from "./components/UserProfile.js" 
import Planner from "./Planner.js"
import Landing from "./components/Landing.js"
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { Routes, Route } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  const hideSidebar = ['/landing', '/login', '/register'].includes(location.pathname);

  return (
    <>
      <Header />
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;