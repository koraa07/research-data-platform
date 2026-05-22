const express = require('express');

const Dataset = require('../models/Dataset');

const router = express.Router();

router.get(
  '/',

  async (req, res) => {

    try {

      const datasets =
        await Dataset.findAll({

          order: [
            ['createdAt', 'DESC']
          ]
        });

      res.json({

        success: true,

        datasets
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
  '/user/:userId',

  async (req, res) => {

    try {

      const datasets =
        await Dataset.findAll({

          where: {
            userId:
              req.params.userId
          },

          order: [
            ['createdAt', 'DESC']
          ]
        });

      res.json({

        success: true,

        datasets
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

      const dataset =
        await Dataset.findByPk(
          req.params.id
        );

      if (!dataset) {

        return res.status(404).json({

          success: false,

          message:
            'Dataset not found'
        });
      }

      res.json({

        success: true,

        dataset
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false
      });
    }
  }
);

router.put(
  '/:id',

  async (req, res) => {

    try {

      const dataset =
        await Dataset.findByPk(
          req.params.id
        );

      if (!dataset) {

        return res.status(404).json({

          success: false,

          message:
            'Dataset not found'
        });
      }

      await dataset.update({

        title:
          req.body.title,

        description:
          req.body.description,

        category:
          req.body.category
      });

      res.json({

        success: true,

        dataset
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false
      });
    }
  }
);

router.delete(
  '/:id',

  async (req, res) => {

    try {

      const dataset =
        await Dataset.findByPk(
          req.params.id
        );

      if (!dataset) {

        return res.status(404).json({

          success: false,

          message:
            'Dataset not found'
        });
      }

      await dataset.destroy();

      res.json({

        success: true,

        message:
          'Dataset deleted'
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false
      });
    }
  }
);

module.exports = router;