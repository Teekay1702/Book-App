import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "fiction";
  const API_KEY = "AIzaSyDzadnnEFZqe7mdLZ0rPAUOI9wunqhTLtQ";

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=10&key=${API_KEY}`
        );
        const data = await response.json();
        console.log("API Response:", data);
        if (data.items) {
          setBooks(data.items);
        } else {
          setError("No books found");
        }
      } catch (error) {
        console.error("Error fetching data: ", + error.message);
        setError("An error occurred while fetching books.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();

  }, [searchQuery]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Books...</p>
      </div>
    );
  }
  

  return (
    <div className="book-list-container">
      <h1>📚 Books for "{searchQuery}"</h1>
      {error && <div className='error-message'>{error}</div>}
      <div className="book-list">
        {books.length === 0 ? (
          <p>No books found for "{searchQuery}"</p>
        ) : (
          books.map((book) => {
            const { id, volumeInfo } = book;
            return (
              <div key={id} className="book-card">
                <div className="book-cover">
                  <img
                    src={volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192"}
                    alt={`${volumeInfo.title} cover`}
                  />
                </div>
                <div className="book-details">
                  <h2>{volumeInfo.title}</h2>
                  <p><strong>Author:</strong> {volumeInfo.authors?.join(", ") || "Unknown"}</p>
                  <p><strong>Published:</strong> {volumeInfo.publishedDate || "N/A"}</p>
                  <p><strong>Genre:</strong> {volumeInfo.categories?.join(", ") || "Uncategorized"}</p>
                  <Link to={`/books/${id}`} className="view-details-button">View Details</Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookList;
