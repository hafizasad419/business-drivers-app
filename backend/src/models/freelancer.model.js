import mongoose from "mongoose";
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For JWT token creation
import { configDotenv } from "dotenv";
configDotenv()
const freelancerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], required: true },
  CNIC: { type: String, required: true },
  bankAccount: { type: String, required: true },
  currentlyEmployed: { type: Boolean, default: false },
  companyName: { type: String }, // Optional, only required if currently employed
  proofOfRegistrationFee: { type: String, required: true }, // File path or URL for proof
  avatar: { type: String, required: true }, // Cloudinary URL for profile picture
  bio: { type: String }, // Bio of the freelancer
  refreshToken: { type: String, }
}, { timestamps: true });

// Add custom methods
// Instance method to check if the entered password is correct
freelancerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to generate JWT token
freelancerSchema.methods.generateAccessToken = function () {
  const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '1d';
  return jwt.sign({ id: this._id, email: this.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiry,
  });
};

freelancerSchema.methods.generateRefreshToken = function () {
  const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '10d';
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiry,
  });
};

// Static method to hash the password before saving
freelancerSchema.pre('save', async function (next) {
  // Hash the password only if it’s new or modified
  if (!this.isModified('password')) return next();

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const Freelancer = mongoose.model('Freelancer', freelancerSchema);
