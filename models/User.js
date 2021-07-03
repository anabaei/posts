 import connection from '../db/connection.js';
 import Sequelize from 'sequelize';

const User = connection.define('User',{
    name: Sequelize.STRING,
    bio: Sequelize.TEXT
  });
  // then you only need to import sequelize and sync it 
 // sequelize.sync();

 export default User;
