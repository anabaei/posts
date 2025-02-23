// models/Appointment.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';
import User from './User.js';  // Assuming the User model is defined
import Specialist from './Specialist.js';  // Assuming the Specialist model is defined

// Define the Appointment model
const Appointment = connection.define('Appointment', {
    appointment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',  // Reference the 'users' table
            key: 'user_id',  // The user's primary key
        },
        onDelete: 'CASCADE',  // If the associated user is deleted, delete the appointment as well
    },
    specialist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'specialists',  // Reference the 'specialists' table
            key: 'specialist_id',  // The specialist's primary key
        },
        onDelete: 'CASCADE',  // If the associated specialist is deleted, delete the appointment as well
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['pending', 'confirmed', 'completed']],  // Define the allowed statuses
        },
    },
    appointment_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    note: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    }
}, {
    tableName: 'appointments',  // Ensure the table name matches
    timestamps: false,          // Disable auto timestamps if you manage them manually
});

// Define the relationship to the User model (one user can have many appointments)
Appointment.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
    onDelete: 'CASCADE',
});

// Define the relationship to the Specialist model (one specialist can have many appointments)
Appointment.belongsTo(Specialist, {
    foreignKey: 'specialist_id',
    targetKey: 'specialist_id',
    onDelete: 'CASCADE',
});

// Sync the model with the database
// sequelize.sync();  // Uncomment this line to sync

export default Appointment;
