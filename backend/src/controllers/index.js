const {User, Student, Token } = require('../models'); // Import your models
const bcrypt =require("bcryptjs")
const jwt=require("jsonwebtoken")
const cloudinary = require('cloudinary');

// Function to generate and save a refresh token
const generateRefreshToken = async (userId) => {
  // Generate refresh token
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

  // Save refresh token in database
  const token = new Token({
    userId: userId,
    refreshToken: refreshToken,
  });
  
  await token.save();
  
  return refreshToken;
};

// Register controller
const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || 'student', // Default to 'employee' if no role is provided
    });

    // Save the user to the database
    await newUser.save();

    // Optionally, generate a refresh token (JWT) after user registration
    const token = await generateRefreshToken(newUser._id);

    // Respond with tokens (access and refresh token)
    return res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Example: When user logs in, generate and save refresh token
const loginUser = async (req, res) => {
  const {email,password}=req.body;
  // Find user (password validation can be handled here)
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json("User not found")
    
  }

  const isPassMatch=await bcrypt.compare(password,user.password)

  if(!isPassMatch){
    return res.status(400).json("Password dont matched")
  }


  // Assuming password validation is done here
  
  // Generate the refresh token and store it in the database
  const token = await generateRefreshToken(user._id);
  

  return res.status(200).json({ message: 'Login successfully', token,user});
};

const authMe = async (req, res) => {
  const user=req.user;
  
  return res.status(200).json(user);
};



const logoutUser = async (req,res) => {
  try {
    await Token.deleteOne({ userId:req.params.id });
  
    return res.status(200).json({ message: 'User logged out successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'error in logout', error });
  }
  // Remove the refresh token from the database
};

// Create Student
const createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(
      req.body.studentPhoto,
      { folder: "student_management_system", width: 550, crop: "scale" }
    );
    studentData.studentPhoto=myCloud.secure_url;
    if(req.body.aadharPart1 && req.body.aadharPart2&&req.body.aadharPart3){

      studentData.aadhaarNumber=req.body.aadharPart1+req.body.aadharPart2+req.body.aadharPart3
    }

    const newStudent = new Student(studentData);
    
    await newStudent.save();

    res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating student", error });
  }
};


// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    
    res.status(500).json({ message: 'Error deleting student', error });
  }
};

// Update Student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const updatedData = req.body;
    
    
    delete updatedData.studentPhoto
    delete updatedData._id

    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

// View Student List
const viewStudentList = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student list', error });
  }
};

// View Student Detail by ID
const viewStudentDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student details', error });
  }
};

module.exports = {
  createStudent,
  deleteStudent,
  updateStudent,
  viewStudentList,
  viewStudentDetailById,
  registerUser,
  loginUser,
  authMe,
  logoutUser,
};

