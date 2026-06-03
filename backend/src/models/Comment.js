const { DataTypes } =
  require('sequelize');

const sequelize =
  require('../config/database');

const Comment =
  sequelize.define(
    'Comment',
    {
      text: {
        type:
          DataTypes.TEXT,

        allowNull:
          false
      },

      userName: {
        type:
          DataTypes.STRING,

        allowNull:
          false
      },

      userId: {
        type:
          DataTypes.UUID,

        allowNull:
          false
      },

      datasetId: {
        type:
          DataTypes.INTEGER,

        allowNull:
          false
      }
    }
  );

module.exports =
  Comment;