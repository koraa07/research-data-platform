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
  '/project/:projectId',

  async (req, res) => {

    try {

      const datasets =
        await Dataset.findAll({

          where: {
            projectId:
              req.params.projectId
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

router.put('/like/:id', async (req, res) => {
  try {

    const Dataset = require('../models/Dataset');

    const dataset = await Dataset.findByPk(req.params.id);

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found'
      });
    }

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId missing'
      });
    }

    // 🔥 ВРЕМЕННАЯ ЗАЩИТА ЧЕРЕЗ MEMORY (без JSON, без таблиц)
    // храним лайки в памяти сервера (быстро для диплома)

    if (!global.likedMap) {
      global.likedMap = {};
    }

    const key = `${userId}_${dataset.id}`;

    if (global.likedMap[key]) {
      return res.status(400).json({
        success: false,
        message: 'Already liked'
      });
    }

    global.likedMap[key] = true;

    await dataset.update({
      likes: dataset.likes + 1
    });

    return res.json({
      success: true,
      likes: dataset.likes + 1
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
module.exports = router;