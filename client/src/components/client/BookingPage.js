// src/components/client/BookingPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookingPage.css";


function BookingPage() {
  const { providerId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  // ✅ Validation logic
  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      const today = new Date().setHours(0, 0, 0, 0); // reset time

      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }

      if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
        newErrors.contact = "Enter a valid 10-digit contact number";
      }

      if (!formData.date) {
        newErrors.date = "Select a date";
      } else {
        const selectedDate = new Date(formData.date).setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.date = "Date cannot be in the past";
        }
      }

      if (!formData.message.trim()) {
        newErrors.message = "Message cannot be empty";
      }

      return newErrors;
    };

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      contact: true,
      date: true,
      message: true,
    }); // force show all errors if submit clicked

    if (!isFormValid) {
      alert("Please fix errors before submitting.");
      return;
    }
    alert("Booking Submitted Successfully!");
    // Send formData to backend here
  };

  return (
    <div className="booking-page">
  
      <div className="booking-card">
        <h2>📅 Book a Service with Provider: {providerId}</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="floating-label">
            <input
              name="name"
              type="text"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label>Name</label>
            {touched.name && errors.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="floating-label">
            <input
              name="email"
              type="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label>Email</label>
            {touched.email && errors.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="floating-label">
            <input
              name="contact"
              type="text"
              placeholder=" "
              value={formData.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label>Contact Number</label>
            {touched.contact && errors.contact && (
              <p className="error">{errors.contact}</p>
            )}
          </div>

          {/* Preferred Date */}
          <div className="floating-label">
            <input
              name="date"
              type="date"
              placeholder=" "
              value={formData.date}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              min={new Date().toISOString().split("T")[0]} // restrict past dates in picker
            />
            <label>Preferred Date</label>
            {touched.date && errors.date && (
              <p className="error">{errors.date}</p>
            )}
          </div>

          {/* Message */}
          <div className="floating-label full-width">
            <textarea
              name="message"
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label>Message (Optional)</label>
            {touched.message && errors.message && (
              <p className="error">{errors.message}</p>
            )}
          </div>

          <div className="booking-buttons full-width">
            <button type="submit" disabled={!isFormValid}>
              📅 Confirm Booking
            </button>
          </div>
        </form>

        {/* Payment Info */}
        <div className="payment-info">
          <h3>💰 Payment Info</h3>
          <p>
            UPI ID: <strong>anita@upi</strong>
            <br />
            Bank: XYZ Bank
            <br />
            Account Holder: Anita Sharma
          </p>
          <img src="/images/payment_qr.png" alt="UPI QR Code" />
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
