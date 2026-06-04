const { DataTypes } =
  require('sequelize');

const sequelize =
  require('../config/database');

const Project =
  sequelize.define(
    'Project',
    {
      title: {
        type:
          DataTypes.STRING,

        allowNull:
          false
      },

      description: {
        type:
          DataTypes.TEXT
      },

      userId: {
        type:
          DataTypes.UUID,

        allowNull:
          false
      }
    }
  );

module.exports =
  Project;