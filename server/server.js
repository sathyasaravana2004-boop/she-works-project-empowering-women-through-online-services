// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const connectDB = require('./config/db');  // 👈 use your db.js file

// // Connect Database
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// const userRoutes = require('./routes/userRoutes');
// const serviceRoutes = require('./routes/serviceRoutes');

// app.use('/api/users', userRoutes);
// app.use('/api/services', serviceRoutes);

// // Default route
// app.get('/', (req, res) => {
//   res.send('SheWorks API is running...');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const connectDB = require('./config/db'); // your DB connection
// const authRoutes = require('./routes/auth'); // new auth routes
// const userRoutes = require('./routes/userRoutes');
// const serviceRoutes = require('./routes/serviceRoutes');

// // Connect Database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);       // Auth routes: register & login
// app.use('/api/users', userRoutes);      // User-related routes
// app.use('/api/services', serviceRoutes);// Service-related routes

// // Default route
// app.get('/', (req, res) => {
//   res.send('SheWorks API is running...');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const connectDB = require('./config/db');
// const path = require("path");


// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const serviceRoutes = require('./routes/serviceRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/services', serviceRoutes);

// // Default route
// app.get('/', (req, res) => res.send('SheWorks API is running...'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const path = require("path");

// // Connect DB
// connectDB();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(helmet());
// app.use(morgan("dev"));
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const serviceRoutes = require("./routes/serviceRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/services", serviceRoutes);

// // Default route
// app.get("/", (req, res) => res.send("SheWorks API is running... 🚀"));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err.stack || err);
//   res.status(500).json({ message: "Something went wrong", error: err.message });
// });

// // Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const { createService, updateService, getServicesByProvider, getServiceById, deleteService } = require('../controllers/serviceController');
// const { protect } = require("../middleware/authMiddleware");

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Routes
// router.post("/", protect, upload.array("images", 10), createService);
// router.put("/:id", protect, upload.array("images", 10), updateService);
// router.get("/provider/:providerId", getServicesByProvider);
// router.get("/:id", getServiceById);
// router.delete("/:id", protect, deleteService);

// module.exports = router;


// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");

// ----------------- Connect to Database -----------------
connectDB();

// ----------------- Initialize App -----------------
const app = express();

// ----------------- Middlewares -----------------
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ----------------- Routes -----------------
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

// Default route
app.get("/", (req, res) => res.send("SheWorks API is running... 🚀"));

// ----------------- Error Handling -----------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
