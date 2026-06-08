const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const ForumPost = sequelize.define('ForumPost', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = ForumPost;
