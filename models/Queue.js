// models/Queue.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';
import Appointment from './Appointment.js';   // Assuming the Appointment model is defined
import Specialist from './Specialist.js';     // Assuming the Specialist model is defined

// Define the Queue model
const Queue = connection.define('Queue', {
    queue_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    appointment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'appointments',   // Reference the 'appointments' table
            key: 'appointment_id',   // The appointment's primary key
        },
        onDelete: 'CASCADE',  // If the associated appointment is deleted, remove queue entry as well
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['pending', 'in-progress', 'completed']],  // Allowed queue statuses
        },
    },
    waiting_time: {
        type: Sequelize.INTEGER,  // Measured in minutes or seconds
        allowNull: false,
    },
    specialist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'specialists',   // Reference the 'specialists' table
            key: 'specialist_id',   // The specialist's primary key
        },
        onDelete: 'CASCADE',  // If the associated specialist is deleted, remove queue entry
    },
    requested_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Default to current time when added to the queue
    },
    row_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'queues',  // Ensure the table name matches
    timestamps: false,    // Disable auto timestamps if you manage them manually
});

// Define the relationship to the Appointment model
Queue.belongsTo(Appointment, {
    foreignKey: 'appointment_id',  // FK in Queue table
    targetKey: 'appointment_id',   // PK in Appointment table
    onDelete: 'CASCADE',           // Action when the appointment is deleted
});

// Define the relationship to the Specialist model
Queue.belongsTo(Specialist, {
    foreignKey: 'specialist_id',  // FK in Queue table
    targetKey: 'specialist_id',   // PK in Specialist table
    onDelete: 'CASCADE',          // Action when the specialist is deleted
});

// Sync the model with the database
// sequelize.sync();  // Uncomment this line to sync

export default Queue;
