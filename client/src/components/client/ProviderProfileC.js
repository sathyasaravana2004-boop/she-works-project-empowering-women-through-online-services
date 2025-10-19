//displays the particular service provider profile
// src/pages/client/ProviderProfileC.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProviderProfileC.css';
import { motion } from 'framer-motion';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const ProviderProfileC = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [serviceProfile, setServiceProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Fetch services for provider - API returns array of services
        const res = await axios.get(`${BASE_URL}/api/services/provider/${providerId}`);
        const services = res.data || [];

              // Keep entire services array - provider may have many services
              setServiceProfile(services);

        const storedReviews = JSON.parse(localStorage.getItem(`reviews_${providerId}`)) || [];
        setReviews(storedReviews);
      } catch (err) {
        console.error('Error fetching provider profile', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [providerId]);

  if (loading) return <div>Loading...</div>;

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
    : 'No ratings yet';

  // Fallback when provider has no services/profile yet
  if (!serviceProfile || serviceProfile.length === 0) {
    return (
      <div>
        <p>No profile found for this provider.</p>
      </div>
    );
  }

  // serviceProfile is an array of services for this provider
  const primary = serviceProfile[0];
  const providerObj = primary.provider || {};
  const imagePath = providerObj.profileImage || (primary.images && primary.images[0]) || '/assets/default-profile.png';
  const image = imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;

  return (
    <motion.div
      className="provider-profile-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
     
      <div className="profile-card">
        <img src={image} alt={serviceProfile.providerName || 'Provider'} className="provider-image" />
        <div className="provider-info">
          <h2>{serviceProfile.providerName || providerObj.name}</h2>
          <p><strong>Services Offered:</strong></p>
          <ul>
            {serviceProfile.map((s, idx) => (
              <li key={s._id || idx}>
                <strong>{s.title}</strong>
                {s.subservices?.length ? <span>: {s.subservices.join(', ')}</span> : null}
                {s.price ? <span> — ₹{s.price}</span> : null}
              </li>
            ))}
          </ul>
          <p><strong>Location:</strong> {primary.location}</p>
          <p>{primary.description}</p>
          <p><strong>⭐ Avg Rating:</strong> {averageRating}</p>

          <div className="buttons">
            <button className="book-btn" onClick={() => navigate(`/client/book/${providerId}`)}>
              📅 Book Service
            </button>
            <button className="chat-btn" onClick={() => navigate(`/client/chat/${providerId}`)}>
              💬 Chat with Provider
            </button>
            <button className="write-review-btn" onClick={() => navigate(`/client/writereview/${providerId}`)}>
              ✍️ Write a Review
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Client Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={index}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p><strong>{review.name}</strong> — ⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ProviderProfileC;
