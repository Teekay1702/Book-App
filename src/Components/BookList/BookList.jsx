import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [booksPerPage] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "fiction";
  const API_KEY = "AIzaSyDzadnnEFZqe7mdLZ0rPAUOI9wunqhTLtQ";

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
           `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${(currentPage - 1) * booksPerPage}&maxResults=${booksPerPage}&key=${API_KEY}`
        );
        const data = await response.json();
        console.log("API Response:", data);
        if (data.items && Array.isArray(data.items)) {
            setBooks(data.items);
            setTotalResults(data.totalItems || 0);
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

  }, [searchQuery, currentPage]);

  const totalPages = totalResults ? Math.ceil(totalResults / booksPerPage) : 0;;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Books...</p>
      </div>
    );
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className="book-list-container">
        <button className="back-button" onClick={() => navigate("/")}>⬅ Back to Home</button>
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
      <div className="pagination">
        <button 
          className="pagination-button" 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">Page {currentPage}</span>
        <button 
          className="pagination-button" 
          onClick={goToNextPage} 
          disabled={(currentPage - 1) * booksPerPage >= totalResults}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
