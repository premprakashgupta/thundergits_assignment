const express = require('express');
const {  loginUser, registerUser, authMe,  logoutUser, createStudent, viewStudentList, deleteStudent, updateStudent, viewStudentDetailById } = require('../controllers');
const roleMiddleware = require('../middlewares/roleMiddleware');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/admin/register', registerUser);
router.post('/admin/login', loginUser);
router.get('/me',authenticate, authMe)
// Public routes (accessible by both admin and employee)
router.post('/student/create',authenticate, roleMiddleware(['admin']), createStudent);
router.get('/students',authenticate, roleMiddleware(['admin']), viewStudentList);
router.get('/student/:id',authenticate, roleMiddleware(['admin']), viewStudentDetailById);
router.delete('/student/:id',authenticate, roleMiddleware(['admin']), deleteStudent);
router.put('/student/:id',authenticate, roleMiddleware(['admin']), updateStudent);



router.get('/logout/:id', authenticate, logoutUser);
// All routes will require authentication and a role check.
module.exports = router;
