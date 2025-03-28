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
            <h1>Welcome to the Book Finder!</h1>
            <p className="quote">
                Books open the doors to countless worlds, each filled with unique stories, ideas, and perspectives. Whether you're drawn to the heart-pounding thrill of a mystery novel, the boundless imagination of fantasy, or the deep introspection of literary fiction, there is always a book waiting to transport you. From timeless classics to modern bestsellers, each genre offers a distinct experience, allowing readers to immerse themselves in different emotions, cultures, and philosophies.</p>
            <p className='quote'>Explore a Wide Range of Books Across Various Genres </p>
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