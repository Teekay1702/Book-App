import React, { useState } from "react";

const BookReviews = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/reviews.json?title=${bookTitle}&api-key=YOUR_NYTIMES_API_KEY`
    );
    const data = await response.json();
    setReviews(data.results);
  };

  return (
    <div>
      <h2>📖 Book Reviews</h2>
      <input
        type="text"
        placeholder="Enter book title..."
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />
      <button onClick={fetchReviews}>Get Reviews</button>

      {reviews.map((review) => (
        <div key={review.url} className="review-card">
          <h3>{review.book_title}</h3>
          <p>{review.summary}</p>
          <a href={review.url} target="_blank" rel="noopener noreferrer">
            Read Full Review
          </a>
        </div>
      ))}
    </div>
  );
};

export default BookReviews;
