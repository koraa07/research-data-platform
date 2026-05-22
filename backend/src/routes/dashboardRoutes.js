const express = require('express');

const Dataset =
  require('../models/Dataset');

const User =
  require('../models/User');

const router =
  express.Router();

router.get(
  '/stats',

  async (req, res) => {

    try {

      const totalDatasets =
        await Dataset.count();

      const totalUsers =
        await User.count();

      const datasets =
        await Dataset.findAll();

      const categories =
        new Set(

          datasets.map(
            (d) => d.category
          )
        );

      const recentDatasets =
        await Dataset.findAll({

          limit: 5,

          order: [
            ['createdAt', 'DESC']
          ]
        });

      res.json({

        success: true,

        stats: {

          totalDatasets,

          totalUsers,

          totalCategories:
            categories.size,

          recentDatasets
        }
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