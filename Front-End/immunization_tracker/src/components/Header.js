import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="header-body">
      <h2 className="header-text"> <FontAwesomeIcon icon={faSyringe}  />Immunization Tracker</h2>
     
    </header>
  );
}

export default Header;