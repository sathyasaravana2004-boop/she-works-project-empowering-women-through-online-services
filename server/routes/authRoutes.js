// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, password, role, location } = req.body;
//   const existingUser = await User.findOne({ email });
//   if (existingUser) return res.status(400).json({ message: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ name, email, password: hashedPassword, role, location });
//   await newUser.save();

//   res.status(201).json({ message: "User registered successfully" });
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token, user });
// });
//  module.exports = router;


// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role, location } = req.body;
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword, role, location });
//     await newUser.save();

//     res.status(201).json({ message: "Registration successful 🎉" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "All fields are required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         location: user.location,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;



// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Service = require("../models/service");   // 👈 Needed for profile check
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      location,
    });
    await user.save();

    res.status(201).json({ message: "Registration successful 🎉 Please login." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 👇 hasProfile check for providers
    let hasProfile = false;
    if (user.role === "provider") {
      const existingService = await Service.findOne({ provider: user._id });
      if (existingService) {
        hasProfile = true;
      }
    }

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        hasProfile,   // 👈 frontend uses this
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
