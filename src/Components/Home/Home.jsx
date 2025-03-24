import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const genres = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Self-help",
    "Biography",
];

const Home = () => {
    const navigate = useNavigate();

    const handleGenreClick = (genre) => {
        navigate(`/books?search=${genre}`);
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Book Collection!</h1>
            <p>Explore a wide range of books in various genres:</p>
            <div className="genre-list">
                {genres.map((genre, index) => (
                    <button
                        key={index}
                        className="genre-button"
                        onClick={() => handleGenreClick(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Home;