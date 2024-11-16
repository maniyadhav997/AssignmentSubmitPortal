const express = require('express');
const { validateRegister, validateLogin, handleValidationErrors } = require('../validators/authValidators');
const { validateAssignmentUpload, handleAssignmentValidationErrors } = require('../validators/assignmentValidators');
const { registerAdmin, loginAdmin, viewAssignments, updateAssignmentStatus } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, registerAdmin);
router.post('/login', validateLogin, handleValidationErrors, loginAdmin);
router.get('/assignments', authenticateAdmin, viewAssignments);
router.post('/assignments/:id/:action', authenticateAdmin, updateAssignmentStatus);

module.exports = router;

