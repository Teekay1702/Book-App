import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<nav className="navbar">
			<div className="logo">
				<Link to="/">📚 Book Finder</Link>
			</div>

			<form className="search-form"
				onSubmit={handleSearchSubmit}>
				<input type="text" className="searchbar" placeholder="Search books..."
					value={searchTerm}
					onChange={handleSearchChange} />
				<button type="submit">Search</button>
			</form>
			<div className="back-to-list">
				<Link to="/books" className="back-button">🔙 Back to Home</Link>
			</div>
		</nav>
	);
};

export default Navbar;
