import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookReviews = () => {
  const { id } = useParams(); // Getting book ID from URL parameters
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "AIzaSyDzadnnEFZqe7mdLZ0rPAUOI9wunqhTLtQ";

  useEffect(() => {
    console.log(`Fetching book details for ID: ${id}`); // Debugging log
    
    const fetchBookDetails = async () => {
        setLoading(true);
        setError("");

        try {
            const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`;
            console.log("Fetching URL:", url); // Log the exact API URL
            
            const response = await fetch(url);
            const data = await response.json();
            
            console.log("API Response:", data); // Log the response
            
            if (data.error) {
                setError("Book not found or invalid ID");
                setLoading(false);
                return;
            }

            setBook(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching book details:", error.message);
            setError("An error occurred while fetching book details.");
            setLoading(false);
        }
    };

    if (id) fetchBookDetails();
}, [id]);


  if (loading) {
    return <div>Loading Book Details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  const { volumeInfo } = book;
  const { title, authors, description, categories, imageLinks, publishedDate, infoLink } = volumeInfo;

  return (
    <div className="book-details-container">
      <h1>{title}</h1>
      <div className="book-details">
        <div className="book-cover">
          <img
            src={imageLinks?.thumbnail || "https://via.placeholder.com/128x192"}
            alt={`${title} cover`}
          />
        </div>
        <div className="book-info">
          <p><strong>Author(s):</strong> {authors?.join(", ") || "Unknown"}</p>
          <p><strong>Published Date:</strong> {publishedDate || "N/A"}</p>
          <p><strong>Genres:</strong> {categories?.join(", ") || "Uncategorized"}</p>
          <p><strong>Description:</strong> {description || "No description available."}</p>
        </div>
      </div>

      {/* Link to More Info */}
      <div>
        <a href={infoLink} target="_blank" rel="noopener noreferrer">
          📖 More Info
        </a>
      </div>
    </div>
  );
};

export default BookReviews;
