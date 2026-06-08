const express = require('express');

const Project = require('../models/Project');

const router = express.Router();

router.post(
  '/',
  async (req, res) => {
    try {

      const project =
        await Project.create({

          title:
            req.body.title,

          description:
            req.body.description,

          userId:
            req.body.userId
        });

      res.json({
        success: true,
        project
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

      const projects =
        await Project.findAll({

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

        projects
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

      const project =
        await Project.findByPk(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      res.json({
        success: true,
        project
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

      const project =
        await Project.findByPk(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({
          success: false,
          message:
            'Project not found'
        });
      }

      await project.update({

        title:
          req.body.title,

        description:
          req.body.description
      });

      res.json({

        success: true,

        project
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

      const project =
        await Project.findByPk(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({
          success: false
        });
      }

      await project.destroy();

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

module.exports = router;