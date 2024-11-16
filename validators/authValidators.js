const { body, validationResult } = require('express-validator');

// Validation for user/admin registration
const validateRegister = [
  body('username')
    .isString().withMessage('Username must be a string')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  
  body('password')
    .isString().withMessage('Password must be a string')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
  body('role')
    .isIn(['User', 'Admin']).withMessage('Role must be either User or Admin')
];

// Validation for login
const validateLogin = [
  body('username')
    .isString().withMessage('Username must be a string')
    .notEmpty().withMessage('Username is required'),
  
  body('password')
    .isString().withMessage('Password must be a string')
    .notEmpty().withMessage('Password is required')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateRegister, validateLogin, handleValidationErrors };
