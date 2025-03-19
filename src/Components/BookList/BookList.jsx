import React, {useEffect, useState} from 'react';
import './BookList.css';

const BookList = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const API_KEY = "AIzaSyDzadnnEFZqe7mdLZ0rPAUOI9wunqhTLtQ";

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=10&key=${API_KEY}`
                  );
				const data = await response.json();
				setBooks(data.items || []);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
				setLoading(false);
			}
		}
        
        fetchBooks();

	}, []);

    if (loading) {
        return <div>Loading...</div>;
    }

return (
    <div className="book-list-container">
      <h1>📚 Bestselling Books</h1>
      <div className="book-list">
        {books.map((book) => {
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
                <a href={volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                  📖 More Info
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;