const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Assignment = require('../models/Assignment');

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role: 'User' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadAssignment = async (req, res) => {
  try {
    const { task, adminId } = req.body;
    const assignment = new Assignment({ userId: req.user._id, task, adminId });
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'Admin' }, 'username');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, uploadAssignment, getAllAdmins };
