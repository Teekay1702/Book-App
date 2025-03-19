import React, {useEffect, useState} from 'react';
import './BookList.css';

const BookList = ({ searchQuery}) => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
	const API_KEY = "AIzaSyDzadnnEFZqe7mdLZ0rPAUOI9wunqhTLtQ";

	useEffect(() => {
        const query = searchQuery || "fiction"; 
		const fetchBooks = async () => {
            setLoading(true);
            setError("");
			try {
				const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=${API_KEY}`
                  );         
				const data = await response.json();
				if (data.items) {
					setBooks(data.items);
				} else {
					setError("No books found");
				}
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data: ", + error.message);
				setLoading(false);
			}
		}
        
        fetchBooks();

	}, [searchQuery]);

    if (loading) {
        return <div>Loading Books...</div>;
    }

    return (
        <div className="book-list-container">
          <h1>📚 Book Collection</h1>
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
                      <a href={volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                        📖 More Info
                      </a>
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
    