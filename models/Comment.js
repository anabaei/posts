import connection from '../db/connection.js';
import Sequelize from 'sequelize';

const Comment = connection.define('Comment',{
   title: Sequelize.STRING,
   content: Sequelize.TEXT,
   like: Sequelize.INTEGER,
   dislike: Sequelize.INTEGER,
   ipAddress: Sequelize.STRING,
   city: Sequelize.STRING,
   country: Sequelize.STRING,
 });

// //  Comment.hasMany(Comment, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });
//  // then you only need to import sequelize and sync it 
// // sequelize.sync();

export default Comment;