// inside database.js we would have below
// on index.js we could have import sequelize from './database.js' & it should print connection is establish 
import Sequelize from 'sequelize';
/// first is for heroku
let connection = null;
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
	// the application is executed on Heroku ... use the postgres database
	connection = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
		dialect: 'postgres',
		protocol: 'postgres',
		port: match[4],
		host: match[3],
		logging: true //false
	});
} 
else if(process.env.DATABASE_URL){
	new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: true
		}
	});
}
else {
	// the application is executed on the local machine
	connection= new Sequelize('postgres://localhost:5432/aaa', { dialect: 'postgres' });
}
connection.authenticate().then(() => {
	console.log('Connection to db established successfully');
});

export default connection;

// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();