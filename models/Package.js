import connection from '../db/connection.js';
import Sequelize from 'sequelize';

const Package = connection.define('Package', {
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    destination: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    timeRange: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    weight: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    explanation:{
        type: Sequelize.TEXT,
        allowNull: true,
    }
  });

export default Package;