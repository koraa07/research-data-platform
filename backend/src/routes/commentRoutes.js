const express =
  require('express');

const Comment =
  require('../models/Comment');

const router =
  express.Router();

router.post(
  '/',

  async (req, res) => {

    try {

     const comment =
  await Comment.create({

    text:
      req.body.text,

    userName:
      req.body.userName,

    userId:
      req.body.userId,

    datasetId:
      req.body.datasetId
  });

      res.json({

        success: true,

        comment
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
  '/dataset/:datasetId',

  async (req, res) => {

    try {

      const comments =
        await Comment.findAll({

          where: {
            datasetId:
              req.params.datasetId
          },

          order: [
            ['createdAt', 'DESC']
          ]
        });

      res.json({

        success: true,

        comments
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

      const comment =
        await Comment.findByPk(
          req.params.id
        );

      if (!comment) {

        return res.status(404).json({

          success: false,

          message:
            'Comment not found'
        });
      }

      await comment.update({

        text:
          req.body.text
      });

      res.json({

        success: true,

        comment
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

      const comment =
        await Comment.findByPk(
          req.params.id
        );

      if (!comment) {

        return res.status(404).json({

          success: false,

          message:
            'Comment not found'
        });
      }

      await comment.destroy();

      res.json({

        success: true
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