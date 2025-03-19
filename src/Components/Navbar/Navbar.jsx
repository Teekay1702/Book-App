import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">BookList</Link>
      </div>
      <input type="text" className="searchbar" placeholder="Search books..." />
    </nav>
  );
};

export default Navbar;
