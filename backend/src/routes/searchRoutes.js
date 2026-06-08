const express = require('express');

const { Op } = require('sequelize');

const User = require('../models/User');
const Project = require('../models/Project');
const Dataset = require('../models/Dataset');

const router = express.Router();

router.get('/', async (req, res) => {

  try {

    const query = req.query.query || '';
    const scope = req.query.scope || 'all';

    const users =
      scope === 'all' || scope === 'users'
        ? await User.findAll({
            where: {
              name: {
                [Op.iLike]: `%${query}%`
              }
            },
            limit: 20
          })
        : [];

    const projects =
      scope === 'all' || scope === 'projects'
        ? await Project.findAll({
            where: {
              title: {
                [Op.iLike]: `%${query}%`
              }
            },
            limit: 20
          })
        : [];

    const datasets =
      scope === 'all' || scope === 'datasets'
        ? await Dataset.findAll({
            where: {
              title: {
                [Op.iLike]: `%${query}%`
              }
            },
            limit: 20
          })
        : [];

    res.json({
      success: true,
      users,
      projects,
      datasets
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false
    });
  }
});

module.exports = router;