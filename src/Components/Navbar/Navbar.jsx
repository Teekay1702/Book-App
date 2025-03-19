import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">📚 Book Finder</Link>
      </div>
      <ul>
        <li><Link to="/">Search</Link></li>
        <li><Link to="/bestsellers">Bestsellers</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
