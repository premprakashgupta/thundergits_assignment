const express = require('express');
const { createEmployee, deleteEmployee, updateEmployee, viewEmployeeList, viewEmployeeDetailById, markAttendance, applyLeave, cancelLeave, approveLeave, rejectLeave, loginUser, registerUser, authMe, attendanceList, attendanceListByUserId, viewLeaveList, empLeaveList } = require('../controllers');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { fileUpload } = require('../utils/file.upload');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',fileUpload("image","uploads/profile",["image/jpeg","image/jpg","image/png"],"Please select png, jpeg or jpg file only"), registerUser);
router.post('/login', loginUser);
router.get('/me',authenticate, authMe)
// Public routes (accessible by both admin and employee)
router.post('/mark-attendance',authenticate, roleMiddleware(['employee']), markAttendance);
router.get('/attendance',authenticate, roleMiddleware(['admin', 'employee']), attendanceList);
router.get('/attendance/:id',authenticate, roleMiddleware(['admin', 'employee']), attendanceListByUserId);
router.get('/emp-leave-list/:id',authenticate, roleMiddleware(['employee']), empLeaveList);
router.post('/apply-leave',authenticate, roleMiddleware(['admin', 'employee']), applyLeave);
router.post('/cancel-leave',authenticate, roleMiddleware(['admin', 'employee']), cancelLeave);

// Admin routes (only admin can access)
router.post('/create',fileUpload("image","uploads/profile",["image/jpeg","image/jpg","image/png"],"Please select png, jpeg or jpg file only"),authenticate, roleMiddleware(['admin']), createEmployee);
router.delete('/delete/:id',authenticate, roleMiddleware(['admin']), deleteEmployee);
router.put('/update/:id', roleMiddleware(['admin']), updateEmployee);
router.get('/employee-list',authenticate, roleMiddleware(['admin']), viewEmployeeList);
router.get('/employee-detail/:id', roleMiddleware(['admin']), viewEmployeeDetailById);
router.get('/leave-list',authenticate, roleMiddleware(['admin']), viewLeaveList);

// Admin leave approval/rejection (only admin can approve/reject leave)
router.put('/approve-leave/:leaveId',authenticate, roleMiddleware(['admin']), approveLeave);
router.put('/reject-leave/:leaveId', authenticate, roleMiddleware(['admin']), rejectLeave);

// All routes will require authentication and a role check.
module.exports = router;
