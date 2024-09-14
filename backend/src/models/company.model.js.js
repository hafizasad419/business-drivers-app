import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; // For JWT token creation

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  pocName: { type: String, required: true }, // Point of contact
  pocId: { type: String, required: true },   // National ID of the POC
  companyNtn: { type: String, required: true }, // National Tax Number
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  proofOfRegistrationFee: { type: String, required: true }, 
  avatarURL: { type: String }, // Cloudinary URL for profile picture
  bio: { type: String }, // Bio of the Company
  refreshToken: { type: String,}
  // URL or file path for proof of registration
}, { timestamps: true });

// Add custom methods
// Instance method to check if the entered password is correct
companySchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to generate JWT token
companySchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Expiration time for the token
  });
};

// Static method to hash the password before saving
companySchema.pre('save', async function (next) {
  // Hash the password only if it’s new or modified
  if (!this.isModified('password')) return next();
  
  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const Company = mongoose.model('Company', companySchema);
