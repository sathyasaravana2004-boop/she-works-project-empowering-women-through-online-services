// import React, { useState } from "react";
// import "./Auth.css";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.role) {
//       alert("Please select a role!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData
//       );

//       alert(res.data.message || "Registration successful 🎉 Please login.");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       if (err.response?.data?.message) {
//         alert(`Registration failed: ${err.response.data.message}`);
//       } else {
//         alert("Registration failed. Try again!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="interactive-grid"></div>
//       <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
//         <h2>Create Your Account</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           required
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           value={formData.password}
//           onChange={handleChange}
//         />

//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//         >
//           <option value="" disabled hidden>
//             Select Role
//           </option>
//           <option value="client">Client</option>
//           <option value="provider">Service Provider</option>
//         </select>

//         <button type="submit" className="auth-btn" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>

//         <p>
//           Already have an account?
//           <Link to="/login" style={{ margin: "0 10px" }}>
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import "./Auth.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.role) {
      alert("Please select a role!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message || "Registration successful 🎉 Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        alert(`Registration failed: ${err.response.data.message}`);
      } else {
        alert("Registration failed. Try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="interactive-grid"></div>
      <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
        <h2>Create Your Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
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
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account?
          <Link to="/login" style={{ margin: "0 10px" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
