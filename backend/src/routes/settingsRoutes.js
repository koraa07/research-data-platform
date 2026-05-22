const express = require('express');

const bcrypt = require('bcryptjs');

const User =
  require('../models/User');

const router =
  express.Router();

router.put(
  '/:id',

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

      await user.update({

        name:
          req.body.name,

        password:
          updatedPassword
      });

      res.json({

        success: true,

        message:
          'Settings updated',

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

        message:
          'Server error'
      });
    }
  }
);

module.exports = router;