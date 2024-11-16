const { body, validationResult } = require('express-validator');

// Validation for uploading assignments
const validateAssignmentUpload = [
  body('task')
    .isString().withMessage('Task must be a string')
    .notEmpty().withMessage('Task is required')
    .isLength({ min: 3 }).withMessage('Task must be at least 3 characters long'),

  body('adminId')
    .isMongoId().withMessage('Admin ID must be a valid MongoDB ID')
    .notEmpty().withMessage('Admin ID is required'),
];

// Middleware to handle assignment validation errors
const handleAssignmentValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateAssignmentUpload, handleAssignmentValidationErrors };
