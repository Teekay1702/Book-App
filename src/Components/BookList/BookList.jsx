import React, { useState } from 'react';
import './BookList.css';

const BookList = () => {
  // Mock book data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      genre: "Fiction",
      coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      genre: "Dystopian",
      coverImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg"
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      genre: "Fiction",
      coverImage: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
    },
    {
      id: 4,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      year: 1997,
      genre: "Fantasy",
      coverImage: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg"
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      year: 1937,
      genre: "Fantasy",
      coverImage: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg"
    }
  ]);

  return (
    <div className="book-list-container">
      <h1>My Book Collection</h1>
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-cover">
              <img src={book.coverImage} alt={`${book.title} cover`} />
            </div>
            <div className="book-details">
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Year:</strong> {book.year}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
