import connection from '../db/connection.js';
import Sequelize from 'sequelize';
import Comment from './Comment.js';

const Post = connection.define('Post',{
   title: Sequelize.STRING,
   content: Sequelize.TEXT
 });
 // then you only need to import sequelize and sync it 
// sequelize.sync();
Post.hasMany(Comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

export default Post;