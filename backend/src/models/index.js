const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true,default:"active" }, // e.g., active, inactive, etc.
  role: { 
    type: String, 
    enum: ['admin', 'student'], 
    default: 'student' 
  },
});

const studentSchema = new Schema({
  admissionNumber: { type: String, required: true, unique: true },
  rollNumber: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  class: { 
    type: String, 
    enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'], 
    required: true 
  },
  section: { type: String },
  session: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  permanentAddress: { type: String, required: true },
  correspondenceAddress: { type: String },
  contactNumber: { type: String, required: true },
  alternateContactNumber: { type: String },
  email: { type: String },
  nationality: { type: String, required: true },
  religion: { type: String },
  category: { type: String, required: true },
  dateOfAdmission: { type: Date, required: true, default: Date.now },
  bloodGroup: { type: String },
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String },
  motherName: { type: String, required: true },
  motherOccupation: { type: String },
  studentPhoto: { type: String, required: false }, // Cloudinary URL or base64
  aadhaarNumber: { type: String }, // Stored in full but input split into three fields
});

// Token schema for storing refresh tokens
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true, // Ensure each token is unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d', // Token expires in 30 days (you can adjust this time as per your needs)
  },
});


const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);

const Token = mongoose.model('Token', tokenSchema);

module.exports = { User, Student,Token };

