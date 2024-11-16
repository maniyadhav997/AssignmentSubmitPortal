const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user || req.user.role !== 'User') throw new Error();
    next();
  } catch {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user || req.user.role !== 'Admin') throw new Error();
    next();
  } catch {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
