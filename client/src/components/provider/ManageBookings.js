import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageBookings.css";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Fetch bookings (replace with your backend call)
  useEffect(() => {
    // Example dummy data
    setBookings([
      {
        id: 1,
        customerName: "John Doe",
        service: "Home-cooked Meal",
        date: "2025-08-14",
        status: "Pending",
      },
      {
        id: 2,
        customerName: "Jane Smith",
        service: "Embroidery",
        date: "2025-08-16",
        status: "Accepted",
      },
    ]);
  }, []);

  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: newStatus,
            }
          : b
      )
    );
  };

  const handleChatClick = (bookingId) => {
    navigate(`/provider/ProviderChat/${bookingId}`);
  };

  return (
    <div className="manage-bookings">
      <h2>Manage Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-info">
              <h3>{booking.customerName}</h3>
              <p>Service: {booking.service}</p>
              <p>Date: {booking.date}</p>
              <p>Status: <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></p>
            </div>
            <div className="actions">
              {booking.status === "Pending" && (
                <>
                  <button
                    className="btn primary"
                    onClick={() => updateBookingStatus(booking.id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn danger"
                    onClick={() => updateBookingStatus(booking.id, "Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
              {booking.status === "Accepted" && (
                <>
                  <button
                    className="btn success"
                    onClick={() => updateBookingStatus(booking.id, "Completed")}
                  >
                    Complete
                  </button>
                  <button
                    className="btn ghost"
                    onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn chat"
                    onClick={() => handleChatClick(booking.id)}
                  >
                    View Chat
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
