// models/SpecialistAvailability.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';

const SpecialistAvailability = connection.define('SpecialistAvailability', {
    specialist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'specialists', // Assuming the specialist table already exists
            key: 'specialist_id', // Reference the `specialist_id` field in specialists table
        },
        onDelete: 'CASCADE',
    },
    days_of_week: {
        type: Sequelize.STRING, // Use a string like "Mon, Tue, Wed" or a JSON array
        allowNull: false,
    },
    start_time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    end_time: {
        type: Sequelize.TIME,
        allowNull: false,
    }
}, {
    tableName: 'specialist_availabilities',
    timestamps: false,
});

export default SpecialistAvailability;
