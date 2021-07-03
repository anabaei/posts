 import connection from '../db/connection.js';
 import Sequelize from 'sequelize';
// import Post from "./Post.js";

const User = connection.define('User',{
    name: Sequelize.STRING,
    bio: Sequelize.TEXT
  });
  // then you only need to import sequelize and sync it 

 //User.hasMany(Post);

 export default User;
