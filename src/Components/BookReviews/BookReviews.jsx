import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './BookReviews.css';

const BookReviews = () => {
	const {id} = useParams();
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [reviews, setReviews] = useState([]);
	const [newReview, setNewReview] = useState("");
	const [editingIndex, setEditingIndex] = useState(null);
	const [editedReview, setEditedReview] = useState('');
	const [error, setError] = useState(null);
	const API_KEY = "AIzaSyDzadnnEFZqe7mdLZ0rPAUOI9wunqhTLtQ";

	const stripHtml = (html) => {
		const doc = new DOMParser().parseFromString(html, "text/html");
		return doc.body.textContent || "";
	};

	useEffect(() => {
		console.log(`Fetching book details for ID: ${id}`);

		const fetchBookDetails = async () => {
			setLoading(true);
			setError("");

			try {
				const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`;
				console.log("Fetching URL:", url);

				const response = await fetch(url);
				const data = await response.json();

				console.log("API Response:", data);

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

		if (id) 
			fetchBookDetails();
		

		const savedReviews = localStorage.getItem(`reviews_${id}`);
		if (savedReviews) {
			setReviews(JSON.parse(savedReviews));
		}

	}, [id]);

	const handleReviewChange = (e) => {
		setNewReview(e.target.value);
	};

	const handleReviewSubmit = (e) => {
		e.preventDefault();
		if (newReview.trim()) {
			const updatedReviews = [
				...reviews,
				newReview,
			];
			setReviews(updatedReviews);
			localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
			setNewReview('');
		}
	};

	const handleEditChange = (e) => {
		setEditedReview(e.target.value);
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		if (editedReview.trim()) {
			const updatedReviews = [...reviews];
			updatedReviews[editingIndex] = editedReview;
			setReviews(updatedReviews);
			setEditingIndex(null);
			setEditedReview('');
			localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
		}
	};

	const handleEditClick = (index) => {
		setEditingIndex(index);
		setEditedReview(reviews[index]);
	};

	const handleDeleteClick = (index) => {
		const updatedReviews = reviews.filter((_, i) => i !== index);
		setReviews(updatedReviews);
		localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
	};

	if (loading) {
		return (
			<div className="loading-container">
				<div className="spinner"></div>
				<p>Loading details...</p>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!book) {
		return <div>Book not found</div>;
	}

	const {volumeInfo} = book;
	const {
		title,
		authors,
		description,
		categories,
		imageLinks,
		publishedDate
	} = volumeInfo;

	return (
		<div className="book-details-container">
			<Link to="/books" className="back-to-list">
				Back to List
			</Link>
			<h1>{title}</h1>
			<div className="book-details">
				<div className="book-cover">
					<img src={
							imageLinks ?. thumbnail || "https://via.placeholder.com/128x192"
						}
						alt={
							`${title} cover`
						}/>
				</div>
				<div className="book-info">
					<p>
						<strong>Author(s):
						</strong>
						{
						authors ?. join(", ") || "Unknown"
					}</p>
					<p>
						<strong>Published Date:
						</strong>
						{
						publishedDate || "N/A"
					}</p>
					<p>
						<strong>Genres:
						</strong>
						{
						categories ?. join(", ") || "Uncategorized"
					}</p>
					<p>
						<strong>Description:
						</strong>
						{
						stripHtml(description) || "No description available."
					}</p>
				</div>
			</div>
			<div className="book-review-section">
				<h2>User Reviews</h2>
				<div className="review-form-container">
				<form onSubmit={handleReviewSubmit}>
					<textarea value={newReview}
						onChange={handleReviewChange}
						placeholder="Write your review here..."/>
					<button type="submit">Submit Review</button>
				</form>
				</div>
				
				<div className="reviews-list">
					{
					reviews.length > 0 ? (reviews.map((review, index) => (
						<div key={index}
							className="review">
							{
							editingIndex === index ? (
								<form onSubmit={handleEditSubmit}>
									<textarea value={editedReview}
										onChange={handleEditChange}
										rows="4"
										cols="50"/>
									<button type="submit">Save</button>
									<button type="button"
										onClick={
											() => setEditingIndex(null)
									}>Cancel</button>
								</form>
							) : (
								<>
									<p>{review}</p>
									<div className="review-actions">
										<button onClick={
											() => handleEditClick(index)
										}>Edit</button>
										<button onClick={
											() => handleDeleteClick(index)
										}>Delete</button>
									</div>
								</>
							)
						} </div>
					))) : (
						<p>No reviews yet.</p>
					)
				} </div>
			</div>
		</div>
	);
};

export default BookReviews;
