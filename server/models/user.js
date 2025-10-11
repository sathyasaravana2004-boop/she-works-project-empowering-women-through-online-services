//  const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ['customer', 'provider'], default: 'customer' },
// location: String,
// });

// module.exports = mongoose.model("User", userSchema);


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['client', 'provider'], required: true },
//   location: { type: String }, // optional for clients
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client", "provider"], required: true },
    location: { type: String }, // optional for clients
    profileImage: { type: String, default: ""  }, 
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("User", userSchema);

