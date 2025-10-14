
import React, { useState } from "react";
import "./Auth.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;

      if (!token) {
        alert("Login failed. No token received.");
        return;
      }

      // ✅ Save token & user details
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect Logic (Fixed)
      if (user.role === "client") {
        // If profile is not yet completed → go to profile creation
        if (!user.contact || !user.location) {
          navigate("/client/CreateClientProfile");
        } else {
          navigate("/client/ClientDashboard");
        }
      } else if (user.role === "provider") {
        if (user.hasProfile) {
          navigate("/provider/ProviderProfileView");
        } else {
          navigate("/provider/CreateProfile");
        }
      } else {
        alert("Invalid role received from server.");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        alert(`Login failed: ${err.response.data.message}`);
      } else {
        alert("Login failed. Invalid credentials or server error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="interactive-grid"></div>
      <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
        <h2>Welcome</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            Select Role
          </option>
          <option value="client">Client</option>
          <option value="provider">Service Provider</option>
        </select>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div>
          <p>
            New user?
            <Link to="/register" style={{ margin: "0 10px" }}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
