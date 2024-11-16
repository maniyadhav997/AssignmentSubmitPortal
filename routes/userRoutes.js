const express = require('express');
const { validateRegister, validateLogin, handleValidationErrors } = require('../validators/authValidators');
const { registerUser, loginUser, uploadAssignment, getAllAdmins } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply the validation middleware 
router.post('/register', validateRegister, handleValidationErrors, registerUser);
router.post('/login', validateLogin, handleValidationErrors, loginUser);
router.post('/upload', authenticateUser, validateAssignmentUpload, handleAssignmentValidationErrors, uploadAssignment);
router.get('/admins', authenticateUser, getAllAdmins);

module.exports = router;
