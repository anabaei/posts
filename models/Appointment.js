// models/Appointment.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';
import User from './User.js';  // Assuming User model exists
import Specialist from './Specialist.js';  // Assuming Specialist model exists

// Define the Appointment model
const Appointment = connection.define('Appointment', {
    appointment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Link to the user
        references: {
            model: 'users',
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
    specialist_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Link to the specialist
        references: {
            model: 'specialists',
            key: 'specialist_id',
        },
        onDelete: 'CASCADE',
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending', // Example status (pending, confirmed, canceled)
    },
    appointment_date: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    note: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'appointments',  // Ensure the table name matches
    timestamps: true,           // Enable auto timestamps
});

// Define the relationships
Appointment.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
});

Appointment.belongsTo(Specialist, {
    foreignKey: 'specialist_id',
    targetKey: 'specialist_id',
});

// Sync the model with the database
// sequelize.sync();  // Uncomment this line to sync the model with DB

export default Appointment;
