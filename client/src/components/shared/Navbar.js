import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { ArrowLeft } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const hideNavbar = ["/login", "/register", "/"].includes(location.pathname);
  if (hideNavbar || !user?.role) return null;

  return (
    <nav className="navbar-container">
      {/* 🔙 Back Button + Logo */}
      <div className="navbar-left">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>

        <div className="navbar-logo" onClick={() => navigate("/")}>
          She<span>Works</span>
        </div>
      </div>

      {/* 🔹 Links */}
      <div className="navbar-links">
        {user.role === "client" && (
          <>
            <NavLink to="/client/ClientDashboard" className="nav-item">Dashboard</NavLink>
            <NavLink to="/client/profile" className="nav-item">Profile</NavLink>
            <NavLink to="/client/orders" className="nav-item">Orders</NavLink>
            <NavLink to="/client/chats" className="nav-item">Chats</NavLink>
          </>
        )}

        {user.role === "provider" && (
          <>
            <NavLink to="/provider/ProviderProfileView" className="nav-item">Profile</NavLink>
            <NavLink to="/provider/ManageBookings" className="nav-item">Bookings</NavLink>
            <NavLink to="/provider/ProviderReviews" className="nav-item">Reviews</NavLink>
            <NavLink to="/provider/chats" className="nav-item">Chats</NavLink>
          </>
        )}
      </div>

      {/* 🔸 Avatar */}
      <div
        className="navbar-avatar"
        onClick={() =>
          navigate(
            user.role === "client"
              ? "/client/profile"
              : "/provider/ProviderProfileView"
          )
        }
      >
        {user.profileImage ? (
          <img src={`http://localhost:5000${user.profileImage}`} alt="avatar" />
        ) : (
          <div className="avatar-placeholder">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

