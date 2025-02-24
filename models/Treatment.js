// models/Treatment.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';

// Define the Treatment model
const Treatment = connection.define('Treatment', {
    treatment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'clinics',  // The referenced table name
            key: 'clinic_id',  // The referenced column
        },
        onDelete: 'CASCADE',  // If a clinic is deleted, delete the associated treatments
    },
    specialist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // No FK constraint here as per your request
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Duration in minutes
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'treatments',
    timestamps: false,     // Disable auto timestamps if you manage them manually
});

export default Treatment;
