// models/Queue.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';
import Appointment from './Appointment.js';   // Assuming Appointment model exists
import Specialist from './Specialist.js';  // Assuming Specialist model exists

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
            model: 'appointments',  // Reference to Appointment table
            key: 'appointment_id',  // Reference to appointment_id column in Appointment table
        },
        onDelete: 'CASCADE',  // If an appointment is deleted, the queue entry should be deleted too
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'waiting',  // Default status for a new queue entry
    },
    waitingTime: {
        type: Sequelize.INTEGER,  // Time in minutes
        allowNull: true,
    },
    specialist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'specialists',  // Reference to Specialist table
            key: 'specialist_id',  // Reference to specialist_id column in Specialist table
        },
        onDelete: 'SET NULL',  // If a specialist is deleted, set this field to null
    },
    requested_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // Default to current timestamp
    },
    row_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,  // Each row should have a unique number to maintain order
    }
}, {
    tableName: 'queues',  // Table name for the Queue
    timestamps: false,    // Disabling auto timestamps
});

// Define relationships
Queue.belongsTo(Appointment, {
    foreignKey: 'appointment_id',  // FK in Queue table pointing to Appointment
    targetKey: 'appointment_id',   // Primary Key in Appointment table
    onDelete: 'SET NULL',           // If an appointment is deleted, the queue entry is also deleted
});

Queue.belongsTo(Specialist, {
    foreignKey: 'specialist_id',  // FK in Queue table pointing to Specialist
    targetKey: 'specialist_id',   // Primary Key in Specialist table
    onDelete: 'SET NULL',         // If a specialist is deleted, set the specialist_id to NULL
});

// Sync the model with the database
// sequelize.sync();  // Uncomment this line to sync the model with the DB

export default Queue;