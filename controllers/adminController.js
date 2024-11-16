const User = require('../models/User');
const Assignment = require('../models/Assignment');

const registerAdmin = async (req, res) => {
  // Similar to user registration but with `role: 'Admin'`
};

const loginAdmin = async (req, res) => {
  // Similar to user login
};

const viewAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user._id }).populate('userId', 'username');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAssignmentStatus = async (req, res) => {
  try {
    const { id, action } = req.params;
    const assignment = await Assignment.findById(id);
    if (!assignment || assignment.adminId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    assignment.status = action === 'accept' ? 'Accepted' : 'Rejected';
    await assignment.save();
    res.json({ message: `Assignment ${action}ed` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin, viewAssignments, updateAssignmentStatus };
