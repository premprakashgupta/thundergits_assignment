const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  image: { type: String, required: false }, // Store image URL or base64
  bankAcc: { type: String,  },
  ifscCode: { type: String, },
  ctc: { type: Number, }, // Annual CTC in numeric format
  adhaar: { type: String,  },
  pan: { type: String,  },
  emergencyNumber: { type: String, },
  // shiftId:{type: Schema.Types.ObjectId, ref: 'Shift',default:"67b5ead40b1623ee911596b2", required: true},
  status: { type: String, required: true,default:"active" }, // e.g., active, inactive, etc.
  role: { 
    type: String, 
    enum: ['admin', 'employee'], 
    default: 'employee' 
  },
});

// Attendance Schema
const attendanceSchema = new Schema({
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: false }, // In minutes or hours
  present: { type: Boolean, required: false }
},{timestamps:true});

// Shift Schema
const shiftSchema = new Schema({
  shiftName: { type: String, required: true },
  intime: { type: Date, required: true },
  outtime: { type: Date, required: true },
  totalWorkingHour: { type: Number, required: true } // In hours
});

// Leave Schema
const leaveSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: Boolean, required: true ,default:true}, // e.g., approved, pending, rejected
  leaveCount: { type: Number, required: true } // Total provided leaves
});
const userLeaveSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  status: { type: String, required: true }, // e.g., approved, pending, rejected, cancel
  leaveCount: { type: Number, required: true }, // Total available leaves
  leaveId: { type: Schema.Types.ObjectId, ref: 'Leave', required: true },
});

// UserLeaveAccount Schema
const userLeaveAccountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  leaveId: { type: Schema.Types.ObjectId, ref: 'Leave', required: true },
  totalLeave: { type: Number, required: true },
  remainLeave: { type: Number, required: true } // Remaining leave count
});

// UserMonthlyPayout Schema
const userMonthlyPayoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  totalPay: { type: Number, required: true }, // Total payout for the month
  status: { type: String, required: true }, // e.g., processed, pending
  leaveCount: { type: Number, required: true },
  presentDay: { type: Number, required: true } // Number of present days in the month
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



// Creating models
const User = mongoose.model('User', userSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Shift = mongoose.model('Shift', shiftSchema);
const Leave = mongoose.model('Leave', leaveSchema);
const UserLeave = mongoose.model('UserLeave', userLeaveSchema);
const UserLeaveAccount = mongoose.model('UserLeaveAccount', userLeaveAccountSchema);
const UserMonthlyPayout = mongoose.model('UserMonthlyPayout', userMonthlyPayoutSchema);
const Token = mongoose.model('Token', tokenSchema);

module.exports = { User, Attendance, Shift, Leave,UserLeave, UserLeaveAccount, UserMonthlyPayout,Token };
