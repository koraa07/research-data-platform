const express = require('express');

const router = express.Router();

const Dataset = require('../models/Dataset');

router.get('/', async (req, res) => {
  try {

    const datasets =
      await Dataset.findAll();

    res.json({
      success: true,
      datasets
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;