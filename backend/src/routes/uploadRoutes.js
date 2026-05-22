const Dataset = require('../models/Dataset');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + '-' + file.originalname
    );
  }
});

const upload = multer({
  storage
});

router.post(
  '/',
  upload.single('file'),

  async (req, res) => {
    try {

      const dataset = await Dataset.create({
        title: req.body.title,

        description:
          req.body.description,

        category: req.body.category,

        filename: req.file.filename,

        userId: req.body.userId
      });

      res.json({
        success: true,
        message: 'Dataset saved',

        dataset
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: 'Upload failed'
      });
    }
  }
);

module.exports = router;