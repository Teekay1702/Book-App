import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Navbar.css";

const Navbar = ({onSearch}) => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		if (searchTerm.trim() === "") {
			return;
		}
		navigate(`/books?search=${searchTerm}`);
	};

	return (
		<nav className="navbar">
			<div className="logo">
				📚 Book Finder
			</div>

			<form className="search-form"
				onSubmit={handleSearchSubmit}>
				<input type="text" className="searchbar" placeholder="Search books..."
					value={searchTerm}
					onChange={handleSearchChange}/>
				<button type="submit">Search</button>
			</form>

		</nav>
	);
};

export default Navbar;
