import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ProviderReviews.css";

const ProviderReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for preview
  useEffect(() => {
    const timeout = setTimeout(() => {
      setReviews([
        {
          _id: "1",
          clientName: "Anita Sharma",
          rating: 5,
          comment: "Absolutely loved the embroidery! So detailed and elegant 💕",
        },
        {
          _id: "2",
          clientName: "Meena Rao",
          rating: 4,
          comment: "Delicious home-cooked meal, tasted just like homemade food 😋",
        },
      ]);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <div className="reviews-loading">Loading reviews...</div>;

  return (
    <div className="provider-reviews-container">
      <h2 className="reviews-title">Client Ratings & Reviews</h2>

      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <div className="review-header">
                <h3>{review.clientName}</h3>
                <div className="stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="review-text">“{review.comment}”</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderReviews;
