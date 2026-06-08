const express = require('express');

const bcrypt = require('bcryptjs');
const multer = require('multer');

const User =
  require('../models/User');

const router =
  express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const isStrongPassword = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return strongPasswordRegex.test(password);
};

router.post('/:id/change-password', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword === currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from the current password'
      });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long and include uppercase, lowercase, number, and symbol'
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password incorrect'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to change password'
    });
  }
});

router.put(
  '/:id',
  upload.single('avatar'),
  async (req, res) => {

    try {

      const user =
        await User.findByPk(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            'User not found'
        });
      }

      let updatedPassword =
        user.password;

      if (req.body.newPassword) {

        const isMatch =
          await bcrypt.compare(

            req.body.currentPassword,

            user.password
          );

        if (!isMatch) {

          return res.status(400).json({

            success: false,

            message:
              'Current password incorrect'
          });
        }

        updatedPassword =
          await bcrypt.hash(
            req.body.newPassword,
            10
          );
      }

      const updatedUser = await user.update({

        name:
          req.body.name,

        avatar:
          req.file
            ? `/uploads/${req.file.filename}`
            : user.avatar,

        bio:
          req.body.bio,

        github:
          req.body.github,

        website:
          req.body.website,

        social1:
          req.body.social1,

        social2:
          req.body.social2,

        social3:
          req.body.social3,

        password:
          updatedPassword
      });

      const avatarUrl = updatedUser.avatar
        ? updatedUser.avatar.startsWith('http')
          ? updatedUser.avatar
          : `http://localhost:5000${updatedUser.avatar}`
        : null;

      res.json({

        success: true,

        message:
          'Settings updated',

        user: {

          id:
            updatedUser.id,

          name:
            updatedUser.name,

          email:
            updatedUser.email,

          avatar:
            avatarUrl,

          bio:
            updatedUser.bio,

          github:
            updatedUser.github,

          website:
            updatedUser.website,

          social1:
            updatedUser.social1,

          social2:
            updatedUser.social2,

          social3:
            updatedUser.social3
        }
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          'Server error'
      });
    }
  }
);

module.exports =
  router;