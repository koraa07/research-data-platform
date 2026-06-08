const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    github: {
      type: DataTypes.STRING,
      allowNull: true
    },

    website: {
      type: DataTypes.STRING,
      allowNull: true
    },

    social1: {
      type: DataTypes.STRING,
      allowNull: true
    },

    social2: {
      type: DataTypes.STRING,
      allowNull: true
    },

    social3: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }
);

module.exports = User;