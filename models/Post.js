import connection from '../db/connection.js';
import Sequelize from 'sequelize';

const Post = connection.define('Post',{
   title: Sequelize.STRING,
   content: Sequelize.TEXT
 });
 // then you only need to import sequelize and sync it 
// sequelize.sync();

export default Post;