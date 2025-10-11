// // src/components/auth/Login.jsx
// import React, { useState, useEffect } from 'react';
// import './Auth.css'; 
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: ''
//   });

//   const navigate = useNavigate();

//   // Clear form when component mounts
//   useEffect(() => {
//     setFormData({ email: '', password: '', role: '' });
//   }, []);

//   const handleChange = (e) => 
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.role) {
//       alert("Please select a role!");
//       return;
//     }

//     alert(`Logged in as ${formData.role}`);
//     navigate(formData.role === 'client' ? '/client/dashboard' : '/provider/CreateProfile');
//   };

//   return (
//     <div className="auth-container">
//       <div className="interactive-grid"></div>

//       <form 
//         className="auth-card" 
//         onSubmit={handleSubmit} 
//         autoComplete="off"
//       >
//         <h2>Welcome</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//           autoComplete="off"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           value={formData.password}
//           onChange={handleChange}
//           autoComplete="new-password"
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
          
//         <button type="submit" className="login-btn">Login</button>

//         <div>
//           <p>
//             New user? 
//             <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import "./Auth.css";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [formData, setFormData] = useState({
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
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       const { token, user } = res.data;

//       if (!token) {
//         alert("Login failed. No token received.");
//         return;
//       }

//       // Save token and role in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", formData.role);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Redirect based on role
//       if (user.role === "client") {
//         navigate("/client/ClientDashboard");
//       } else if (user.role === "provider") {
//         navigate("/provider/CreateProfile");
//       } else {
//         alert("Invalid role received from server.");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response && err.response.data && err.response.data.message) {
//         alert(`Login failed: ${err.response.data.message}`);
//       } else {
//         alert("Login failed. Invalid credentials or server error.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="interactive-grid"></div>
//       <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
//         <h2>Welcome</h2>

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

//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <div>
//           <p>
//             New user?
//             <Link to="/register" style={{ margin: "0 10px" }}>
//               Register
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import "./Auth.css";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [formData, setFormData] = useState({
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

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       const { token, user } = res.data;

//       if (!token) {
//         alert("Login failed. No token received.");
//         return;
//       }

//       // ✅ Save token and role
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("user", JSON.stringify(user));

//       // ✅ Redirect based on role
//       if (user.role === "client") {
//         navigate("/client/ClientDashboard");
//       } else if (user.role === "provider") {
//         navigate("/provider/CreateProfile");
//       } else {
//         alert("Invalid role received from server.");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response?.data?.message) {
//         alert(`Login failed: ${err.response.data.message}`);
//       } else {
//         alert("Login failed. Invalid credentials or server error.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="interactive-grid"></div>
//       <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
//         <h2>Welcome</h2>

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

//         {/* optional: role selection if you want */}
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

//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <div>
//           <p>
//             New user?
//             <Link to="/register" style={{ margin: "0 10px" }}>
//               Register
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


// // src/pages/Auth/Login.jsx
// import React, { useState } from "react";
// import "./Auth.css";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [formData, setFormData] = useState({
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

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       const { token, user } = res.data;

//       if (!token) {
//         alert("Login failed. No token received.");
//         return;
//       }

//       // ✅ Save token & user details
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("user", JSON.stringify(user));

//       // ✅ Redirect logic
//       if (user.role === "client") {
//         navigate("/client/ClientDashboard");
//       } else if (user.role === "provider") {
//         if (user.hasProfile) {
//           navigate("/provider/ProviderProfileView");
//         } else {
//           navigate("/provider/CreateProfile");
//         }
//       } else {
//         alert("Invalid role received from server.");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response?.data?.message) {
//         alert(`Login failed: ${err.response.data.message}`);
//       } else {
//         alert("Login failed. Invalid credentials or server error.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="interactive-grid"></div>
//       <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
//         <h2>Welcome</h2>

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

//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <div>
//           <p>
//             New user?
//             <Link to="/register" style={{ margin: "0 10px" }}>
//               Register
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


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

      // ✅ Redirect logic
      if (user.role === "client") {
        navigate("/client/ClientDashboard");
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
