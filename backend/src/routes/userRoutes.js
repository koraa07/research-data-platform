const express =
  require('express');

const User =
  require('../models/User');

const router =
  express.Router();

router.get(
  '/',

  async (req, res) => {

    try {

      const users =
        await User.findAll({

          attributes: [
            'id',
            'name',
            'email'
          ],

          order: [
            ['name', 'ASC']
          ]
        });

      res.json({

        success: true,

        users
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false
      });
    }
  }
);

router.get(
  '/:id',

  async (req, res) => {

    try {

      const user =
        await User.findByPk(
          req.params.id,
          {
            attributes: [
              'id',
              'name',
              'email'
            ]
          }
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            'User not found'
        });
      }

      res.json({

        success: true,

        user
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false
      });
    }
  }
);

module.exports =
  router;