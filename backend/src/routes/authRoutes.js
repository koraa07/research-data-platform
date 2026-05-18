const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

console.log('middleware:', authMiddleware);

console.log(authController);

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get(
  '/profile',
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: 'Protected route accessed',
      user: req.user
    });
  }
);

module.exports = router;
