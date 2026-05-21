const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const Dataset = sequelize.define(
  'Dataset',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT
    },

    category: {
      type: DataTypes.STRING
    },

    filename: {
      type: DataTypes.STRING
    }
  }
);

module.exports = Dataset;