const express = require('express');

const ForumPost = require('../models/ForumPost');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const post = await ForumPost.create({
      content: req.body.content,
      userName: req.body.userName,
      userId: req.body.userId,
      parentId: req.body.parentId || null
    });

    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await ForumPost.findAll({
      where: { parentId: null },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false
    });
  }
});

router.get('/thread/:id', async (req, res) => {
  try {
    const root = await ForumPost.findByPk(req.params.id);
    if (!root) {
      return res.status(404).json({
        success: false,
        message: 'Thread not found'
      });
    }

    const replies = await ForumPost.findAll({
      where: { parentId: req.params.id },
      order: [['createdAt', 'ASC']]
    });

    res.json({
      success: true,
      root,
      replies
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await ForumPost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Forum post not found'
      });
    }

    await post.update({
      content: req.body.content
    });

    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await ForumPost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false
      });
    }

    await post.destroy();

    res.json({
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false
    });
  }
});

module.exports = router;
