import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./ProviderProfileView.css";

const BASE_URL = "http://localhost:5000";

const ProviderProfileView = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfileImage, setUserProfileImage] = useState("");

  const getFullImageURL = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch provider's services
        const res = await axios.get(`${BASE_URL}/api/services/provider/${user.id}`);
        setServices(res.data || []);

        // Fetch fresh user data for profile image
        const userRes = await axios.get(`${BASE_URL}/api/auth/user/${user.id}`);
        const profileImg =
          userRes.data?.profileImage ||
          (res.data?.[0]?.images?.[0] ? `${BASE_URL}${res.data[0].images[0]}` : "");
        setUserProfileImage(profileImg);
      } catch (err) {
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;

  if (!services.length) {
    return (
      <div>
        <p>No profile/services found. Please create your profile.</p>
        <button onClick={() => navigate("/provider/CreateProfile")}>Create Profile</button>
      </div>
    );
  }

  const profile = services[0];

  return (
    <div className="provider-profile-view">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-header-left">
          <img
            src={userProfileImage || "/assets/default-profile.png"}
            alt={profile.providerName}
            className="profile-pic-circle"
          />
        </div>

        <div className="profile-header-right">
          <h2>{profile.providerName}</h2>
          <p>{profile.title} — {profile.subservices?.join(", ")}</p>
          <div className="profile-actions">
            <button className="action-btn" onClick={() => navigate(`/edit-profile/${profile._id}`)}>✏️ Edit Profile</button>
            <button className="action-btn" onClick={() => navigate("/provider/ManageBookings")}>📅 Manage Bookings</button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="profile-section">
        <h3>About</h3>
        <p>{profile.description}</p>
        <p><strong>Contact:</strong> {profile.providerContact}</p>
        <p><strong>Email:</strong> {profile.providerEmail}</p>
        <p><strong>Location:</strong> {profile.location}</p>
        <p><strong>Price:</strong> {profile.price}</p>
      </div>

      {/* Portfolio */}
      <div className="profile-section">
        <h3>Portfolio</h3>
        <div className="image-gallery">
          {profile.images?.length > 0 ? (
            profile.images.map((img, i) => (
              <motion.img
                key={i}
                src={getFullImageURL(img)}
                alt={`work-${i}`}
                className="gallery-image"
                whileHover={{ scale: 1.08 }}
              />
            ))
          ) : (
            <p>No portfolio uploaded yet.</p>
          )}
        </div>

        {/* Upload Work */}
        <div style={{ marginTop: 12 }}>
          <label className="upload-button">
            Upload Work
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={async (e) => {
                const files = Array.from(e.target.files);
                if (!files.length) return;

                const fd = new FormData();
                files.forEach((f) => fd.append("images", f));
                const token = localStorage.getItem("token");

                try {
                  await axios.put(`${BASE_URL}/api/services/${profile._id}`, fd, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "multipart/form-data",
                    },
                  });

                  const r = await axios.get(`${BASE_URL}/api/services/provider/${JSON.parse(localStorage.getItem("user")).id}`);
                  setServices(r.data);

                  if (r.data?.[0]?.images?.[0]) {
                    setUserProfileImage(getFullImageURL(r.data[0].images[0]));
                  }
                } catch (err) {
                  console.error("Upload error:", err);
                  alert("Upload failed");
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Bookings */}
      <div className="profile-section">
        <h3>Client Bookings</h3>
        <p>Bookings functionality will be shown here later.</p>
      </div>

      {/* Reviews */}
      <div className="profile-section">
        <h3>Client Reviews & Ratings</h3>
        <p>Reviews will be displayed here later.</p>
      </div>

      {/* Logout */}
      <div className="logout-btn-container">
        <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
      </div>
    </div>
  );
};

export default ProviderProfileView;
