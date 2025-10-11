import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProviderProfileIcon.css";

export default function ProviderProfileIcon({ provider }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/provider/ProviderProfileView"); // ✅ adjust this path if your ProviderProfileView route differs
  };

  // If provider has an image, use it. Otherwise, show initials.
  const getInitials = (name) => {
    if (!name) return "S";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="profile-icon-wrapper" onClick={handleClick}>
      {provider?.image ? (
        <img
          src={provider.image}
          alt="Provider Profile"
          className="profile-circle"
        />
      ) : (
        <div className="profile-circle initials-circle">
          {getInitials(provider?.name)}
        </div>
      )}
    </div>
  );
}
