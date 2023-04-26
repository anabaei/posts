import connection from '../db/connection.js';
import Sequelize from 'sequelize';
import Comment from './Comment.js';

const Travel = connection.define('Travel', {
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    destination: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    timeRanges: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    fee: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    departureDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    explanation:{
        type: Sequelize.TEXT,
        allowNull: true,
    }
  });

Travel.hasMany(Comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

export default Travel;