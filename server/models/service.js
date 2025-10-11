// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   title: String,                   // e.g. "Hand Embroidery"
//   description: String,
//   price: Number,
//   category: String,                // e.g. "Embroidery"
//   subservices: [String],           // e.g. ["Hand Embroidery", "Machine Embroidery"]
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

// module.exports = mongoose.model('Service', serviceSchema);
// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema(
//   {
//     provider: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // assuming provider is a registered user
//       required: false, // can make true later if needed
//     },
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     service: {
//       type: String, // main category
//       required: true,
//     },
//     subservices: {
//       type: [String], // multiple subservices
//       required: true,
//     },
//     bio: {
//       type: String,
//       required: true,
//       minlength: 10,
//     },
//     contact: {
//       type: String,
//       required: true,
//       match: /^[0-9]{10}$/, // only 10-digit phone
//     },
//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//       match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
//     },
//     images: {
//       type: [String], // store file paths or URLs
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Service", serviceSchema);



// models/service.js
// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   subservices: { type: [String], required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   location: { type: String, required: true },
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// });

// module.exports = mongoose.model('Service', serviceSchema);

// backend/models/service.js
// const mongoose = require('mongoose');

// const ServiceSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true }, // main service/category
//     subservices: { type: [String], required: true }, // multiple subservices
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     location: { type: String, required: true }, // provider address
//     provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // linked provider
//   },
//   { timestamps: true } // createdAt and updatedAt
// );

// module.exports = mongoose.model('Service', ServiceSchema);

// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   subservices: [{ type: String, required: true }],
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   location: { type: String, required: true },
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Service", serviceSchema);


// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   contact: { type: String, required: true },
//   service: { type: String, required: true },
//   subservices: [{ type: String }],
//   description: { type: String, required: true },
//   price: { type: String },
//   location: { type: String },
//   images: [{ type: String }], // will store file paths or URLs
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link provider to user
// }, { timestamps: true });

// module.exports = mongoose.model("Service", serviceSchema);


// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema({
//   name: { type: String, required: true },          // Provider's name
//   email: { type: String, required: true },         // Provider's email
//   contact: { type: String, required: true },       // Provider's contact number
//   title: { type: String, required: true },         // Service title
//   subservices: [{ type: String, required: true }], // Array of subservices
//   description: { type: String, required: true },   // Service description
//   price: { type: Number, required: true },         // Service price
//   location: { type: String, required: true },      // Service location
//   images: [{ type: String }],                      // Uploaded images paths
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Service", serviceSchema);


// backend/models/service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },                 // main category/service (e.g., Embroidery)
  subservices: [{ type: String }],                         // array of chosen subservices
  description: { type: String },
  price: { type: Number },
  location: { type: String },

  // provider reference + snapshot fields (so profile shows name/email/contact quickly)
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerName: { type: String },
  providerEmail: { type: String },
  providerContact: { type: String },

  // uploaded image paths (stored under /uploads)
  images: [{ type: String }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
