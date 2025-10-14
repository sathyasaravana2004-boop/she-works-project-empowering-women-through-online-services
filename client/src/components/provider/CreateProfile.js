// src/pages/provider/CreateProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateProfile.css";

const BASE_URL = "http://localhost:5000";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    subservices: [],
    description: "",
    price: "",
    location: "",
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [servicesWithSub, setServicesWithSub] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/services/categories`)
      .then((res) => {
        const data = {};
        res.data.forEach((c) => (data[c.category] = c.subservices));
        setServicesWithSub(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubserviceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let subs = [...prev.subservices];
      if (checked) subs.push(value);
      else subs = subs.filter((s) => s !== value);
      return { ...prev, subservices: subs };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.service ||
      formData.subservices.length === 0 ||
      !formData.description ||
      !formData.price ||
      !formData.location ||
      formData.images.length === 0
    ) {
      alert("⚠️ Please fill all required fields before submitting.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("contact", formData.contact);
      fd.append("service", formData.service);
      fd.append("description", formData.description);
      fd.append("price", formData.price);
      fd.append("location", formData.location);

      formData.subservices.forEach((s) => fd.append("subservices", s));
      formData.images.forEach((file) => fd.append("images", file));

      const res = await axios.post(`${BASE_URL}/api/services`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile created successfully ✅");

      // Update localStorage user with full URL profileImage
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.hasProfile = true;
        if (res.data.images && res.data.images.length > 0) {
          user.profileImage = `${BASE_URL}${res.data.images[0].startsWith("/") ? "" : "/"}${res.data.images[0]}`;
        }
        localStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/provider/ProviderProfileView");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating profile");
    }
  };

  return (
    <div className="create-profile-container">
      <h2>Create Your Service Provider Profile</h2>
      <form
        className="create-profile-form"
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        {/* name, email, contact */}
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input
            name="contact"
            type="text"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        {/* service */}
        <div className="form-group">
          <label>Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            {Object.keys(servicesWithSub).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* subservices */}
        {formData.service && (
          <div className="form-group">
            <label>Subservices</label>
            <div className="subservices-container">
              {servicesWithSub[formData.service]?.map((sub) => (
                <label key={sub} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={sub}
                    checked={formData.subservices.includes(sub)}
                    onChange={handleSubserviceChange}
                    required={formData.subservices.length === 0}
                  />
                  {sub}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* description, price, location */}
        <div className="form-group">
          <label>About / Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* images */}
        <div className="form-group">
          <label>Portfolio / Profile Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
          {previewImages.length > 0 && (
            <div className="image-preview-container">
              {previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`p-${i}`}
                  className="preview-image"
                />
              ))}
            </div>
          )}
        </div>

        <button type="submit">🚀 Submit Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
