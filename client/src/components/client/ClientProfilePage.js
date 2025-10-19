// src/components/client/ClientProfilePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientProfilePage.css";

const ClientProfilePage = () => {
  const navigate = useNavigate();

  const [user] = useState({
    name: "Demo Client",
    email: "demo@example.com",
    contact: "+91 9876543210",
    location: "Chennai, India",
    totalOrders: 5,
    profilePic: "/assets/default-profile.png",
  });

  const handleEditProfile = () => {
    navigate("/client/edit-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientData");
    navigate("/login");
  };

  return (
    <div className="client-profile-container">
      {/* 🔹 Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

      {/* 🔹 Profile Card */}
      <div className="profile-card">
        <div className="profile-content">
          {/* Profile Image */}
          <img
            src={user.profilePic}
            alt="Profile"
            className="profile-image"
          />

          {/* Profile Details */}
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Total Orders:</strong> {user.totalOrders}</p>

            <button className="edit-profile-btn" onClick={handleEditProfile}>
              ✏️ Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;
