const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');

const User = require('../models/User');

const isStrongPassword = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return strongPasswordRegex.test(password);
};

const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Username is required'
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    const existingEmail =
      await User.findOne({
        where: { email }
      });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const existingName =
      await User.findOne({
        where: { name }
      });

    if (existingName) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken'
      });
    }

    if (!password || !isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol'
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({

        name,

        email,

        password: hashedPassword
      });

    const token =
      jwt.sign(

        {
          id: user.id,
          email: user.email
        },

        process.env.JWT_SECRET,

        {
          expiresIn: '7d'
        }
      );

    res.status(201).json({

      success: true,

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { name: email }
          ]
        }
      });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token =
      jwt.sign(

        {
          id: user.id,
          email: user.email
        },

        process.env.JWT_SECRET,

        {
          expiresIn: '7d'
        }
      );

    res.json({

      success: true,

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  register,
  login
};