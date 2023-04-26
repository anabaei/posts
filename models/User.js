 import connection from '../db/connection.js';
 import Sequelize from 'sequelize';
 import Post from "./Post.js";
import Travel from './Travel.js';
import Package from './Package.js';

const User = connection.define('User',{
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    bio: Sequelize.TEXT
  });
  // then you only need to import sequelize and sync it 

User.hasMany(Post, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Travel, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Package, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

export default User;
