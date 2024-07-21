import React, {useState} from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// Importing files
import { MenuItems } from "./MenuItems";
import './../../css/navbar-style.css';
import Logo from './../../imgs/logo.png';
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
    // Check the width of the browser window
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };
    return (
    <nav className={`navbar-items ${isMobileMenuOpen ? "active" : ""}`}>
      <a href="/" className="navbar-logo"><img src={Logo} alt="logo" className="header-logo"/>
      <h1 className="name ">Rent<span> My Car</span></h1>
      </a>
      <div 
        className={`mobile-menu-icon ${isMobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
        {MenuItems.map((item) => (
          <li key={item.id}>
            {item.type === "HashLink" ? (
              <HashLink
              key={item.id}
                to={item.url}
                className={item.cName}
                onClick={toggleMobileMenu}
              >
                {item.title}
              </HashLink>
            ) : (
              <Link
                key={item.id} // Use a unique attribute from your data as the key
                to={item.url}
                className={item.cName}
                onClick={toggleMobileMenu}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
    );
};

export default Navbar;