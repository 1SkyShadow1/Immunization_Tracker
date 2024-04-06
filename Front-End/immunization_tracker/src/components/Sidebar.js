// Sidebar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu, GiHomeGarage } from 'react-icons/gi';
import { FaUser, FaRegCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear user session here
    // For example, if you're using localStorage to store the user session:
    // localStorage.removeItem('user');

    // Then navigate to the login page
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <GiHamburgerMenu className="sidebar-toggle" onClick={toggleSidebar} size={30} />
      <ul>
        <li><Link to='/'><GiHomeGarage size={20} /> Home</Link></li>
        <li><Link to='/user-profile'><FaUser size={20} /> Profile</Link></li>
        <li><Link to='/planner'><FaRegCalendarAlt size={20} /> Planner</Link></li>
        <li><button onClick={handleLogout}><FaSignOutAlt size={20} /> Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;