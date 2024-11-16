const express = require('express');
const { registerUser, loginUser, uploadAssignment, getAllAdmins } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', authenticateUser, uploadAssignment);
router.get('/admins', authenticateUser, getAllAdmins);

module.exports = router;
