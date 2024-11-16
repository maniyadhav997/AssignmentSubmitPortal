const express = require('express');
const { registerAdmin, loginAdmin, viewAssignments, updateAssignmentStatus } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', authenticateAdmin, viewAssignments);
router.post('/assignments/:id/:action', authenticateAdmin, updateAssignmentStatus);

module.exports = router;
