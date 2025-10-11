// src/pages/client/WriteReviewPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WriteReviewPage.css';
import ClientProfileIcon from './ClientProfileIcon';

function WriteReviewPage() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({ rating: '', comment: '' });

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build review object
    const reviewer = JSON.parse(localStorage.getItem('user')) || { name: 'Anonymous' };
    const newReview = {
      name: reviewer.name || 'Anonymous',
      rating: Number(review.rating),
      comment: review.comment,
      createdAt: new Date().toISOString(),
    };

    const key = `reviews_${providerId}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.unshift(newReview); // add newest first
    localStorage.setItem(key, JSON.stringify(existing));

    alert('Review submitted successfully!');
    // Redirect to provider public profile
    navigate(`/provider/${providerId}`);
  };

  return (
    <div className="write-review-container">
      <div>
            <ClientProfileIcon />
            
            </div>
      <div className="review-card">
        <h2>Write a Review for <span className="highlight">Provider {providerId}</span></h2>
        <form onSubmit={handleSubmit}>
          <label>Rating:</label>
          <select name="rating" value={review.rating} onChange={handleChange} required>
            <option value="">Select rating</option>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Below Average</option>
            <option value="1">⭐ Poor</option>
          </select>

          <label>Comment:</label>
          <textarea
            name="comment"
            value={review.comment}
            onChange={handleChange}
            placeholder="Write your feedback..."
            required
          />

          <button type="submit" className="submit-review-btn">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default WriteReviewPage;
