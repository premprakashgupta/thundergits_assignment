const { User, Attendance, Leave, UserLeaveAccount, Token, UserLeave } = require('../models'); // Import your models
const bcrypt =require("bcryptjs")
const jwt=require("jsonwebtoken")

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
  const { email, password, name,designation, role } = req.body;
  if(!req.file){
    return res.status(400).json("File not found, which is required");
  }
  const image=req.file.path

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
      name,
      image,
      designation,
      role: role || 'employee', // Default to 'employee' if no role is provided
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

// Create Employee
const createEmployee = async (req, res) => {
  try {
    if(!req.file){
      return res.status(400).json("File not found, which is required");
    }
    const image=req.file.path
  
    const { email, name, designation, bankAcc, ifscCode, ctc, adhaar, pan, emergencyNumber, status,shiftId } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password=await bcrypt.hash("12345",salt)
    const newUser = new User({ email, password, name, designation, image, bankAcc, ifscCode, ctc, adhaar, pan, emergencyNumber, status,shiftId });
    await newUser.save();
    const leaves=await Leave.find({status:true});
    Promise.all(
      leaves.map(async(data)=>{
        await UserLeaveAccount.create({
          leaveId:data._id,
          totalLeave:data.leaveCount,
          remainLeave:data.leaveCount
        })
      })
    )
    res.status(201).json({ message: 'Employee created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

// View Employee List
const viewEmployeeList = async (req, res) => {
  try {
    const employees = await User.find({role:"employee"});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employee list', error });
  }
};


// View Employee Detail by ID
const viewEmployeeDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await User.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employee details', error });
  }
};

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { userId } = req.body;

    // Use UTC dates
   
    
    const startTime = (new Date()).setUTCHours(0, 0, 0, 0);
      // Set end of the day in UTC
    const endTime = (new Date()).setUTCHours(23, 59, 59, 999);

    console.log({ startTime,endTime })
    // Check if attendance for today already exists
    const existAttendanceForToday = await Attendance.findOne({
      userId,
      createdAt: { $gte: startTime, $lte: endTime },
    });

    console.log(existAttendanceForToday);  // Check the fetched result

    if (existAttendanceForToday) {
      // Update checkout time and duration
      existAttendanceForToday.checkout = new Date();
      existAttendanceForToday.duration = existAttendanceForToday.checkout - existAttendanceForToday.checkin;
      existAttendanceForToday.present = true;
      await existAttendanceForToday.save();
      return res.status(200).json({
        message: 'Attendance marked successfully',
        attendance: existAttendanceForToday,
      });
    }

    // If no attendance exists for today, create a new record
    const attendance = new Attendance({
      userId,
      checkin: new Date(),
    });
    await attendance.save();
    return res.status(201).json({
      message: 'Attendance marked successfully',
      attendance,
    });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Error marking attendance', error });
  }
};


const attendanceList = async (req, res) => {
  try {
    
    const attendance = await Attendance.find();
    res.status(200).json( attendance || [] );
  } catch (error) {
    res.status(500).json({ message: 'attendance list fetch failde', error });
  }
};
const attendanceListByUserId = async (req, res) => {
  try {
    const attendance = await Attendance.find({userId:req.params.id});
    res.status(200).json( attendance || [] );
  } catch (error) {
    res.status(500).json({ message: 'attendance by user faild', error });
  }
};

// Apply Leave
const viewLeaveList = async (req, res) => {
  try {
    
    const userLeave=await UserLeave.find()
    res.status(200).json(userLeave);
  } catch (error) {
    res.status(500).json({ message: 'Error applying leave', error });
  }
};

const empLeaveList = async (req, res) => {
  try {
    const userLeave = await UserLeave.find({userId:req.params.id});
    res.status(200).json(userLeave);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employee list', error });
  }
};

const applyLeave = async (req, res) => {
  try {
    const { userId, from,to ,leaveCount} = req.body;
    // for now id is static 
    const leaveId="67b6e063fc3e05ec5d802962";
    console.log({ userId, leaveId, from,to ,leaveCount})
    const userLeaveAccount = await UserLeaveAccount.findOne({ userId, leaveId, });
    if (!userLeaveAccount) {
      return res.status(404).json({ message: 'Leave account not found for this user' });
    }

    // const leaveDays=(new Date(to))-(new Date(from))
    if (!userLeaveAccount || userLeaveAccount.remainLeave < leaveCount) {
      return res.status(400).json({ message: 'Not enough leave balance' });
    }

    userLeaveAccount.remainLeave -= leaveCount;
    await userLeaveAccount.save();

    const leave=await UserLeave.create({
      leaveId,
      userId,from,to,status:"pending",leaveCount
    })
    res.status(200).json({ message: 'Leave applied successfully', leave });
  } catch (error) {
    res.status(500).json({ message: 'Error applying leave', error });
  }
};

// Cancel Leave
const cancelLeave = async (req, res) => {
  try {
    const { userId,leaveId, } = req.body;
    const leave = await UserLeave.findById( leaveId );
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    const leaveAccount=await UserLeaveAccount.findOne({userId,leaveId,})
    leaveAccount.remainLeave += leaveDays;
    await leaveAccount.save();
    leave.status="cancel";
    await leave.save()

    res.status(200).json({ message: 'Leave cancelled successfully', leave });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling leave', error });
  }
};

// Approve Leave
const approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const leaveRequest = await Leave.findById(leaveId);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leaveRequest.status = 'approved';
    await leaveRequest.save();

    res.status(200).json({ message: 'Leave approved successfully', leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error approving leave', error });
  }
};

// Reject Leave
const rejectLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const leaveRequest = await Leave.findById(leaveId);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leaveRequest.status = 'rejected';
    await leaveRequest.save();

    res.status(200).json({ message: 'Leave rejected successfully', leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting leave', error });
  }
};

const logoutUser = async (refreshToken) => {
  // Remove the refresh token from the database
  await Token.deleteOne({ refreshToken });

  return { message: 'User logged out successfully' };
};


module.exports = {
  createEmployee,
  deleteEmployee,
  updateEmployee,
  viewEmployeeList,
  viewEmployeeDetailById,
  markAttendance,
  attendanceListByUserId,
  attendanceList,
  applyLeave,
  cancelLeave,
  approveLeave,
  rejectLeave,
  logoutUser,
  loginUser,
  registerUser,
  authMe,
  viewLeaveList,
  empLeaveList
};
