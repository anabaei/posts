// models/Treatment.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';
import Clinic from './Clinic.js';  // Assuming Clinic model is defined
import Specialist from './Specialist.js';  // Assuming Specialist model is defined

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
            model: 'clinics',  // Reference the 'clinics' table
            key: 'clinic_id',  // The clinic's primary key
        },
        onDelete: 'CASCADE', // If the associated clinic is deleted, remove treatments
    },
    specialist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // No foreign key, but we would validate specialist ID manually if needed
    },
    duration: {
        type: Sequelize.INTEGER,  // Duration in minutes
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    durations: {
        type: Sequelize.STRING,  // Description of the treatment duration (e.g., "30 minutes")
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
    tableName: 'treatments',  // Ensure the table name matches
    timestamps: false,        // Disable auto timestamps if you manage them manually
});

// Define relationships (though no direct foreign keys for specialist_id)
// We use clinic_id to set up the relationship to the Clinic model
Treatment.belongsTo(Clinic, {
    foreignKey: 'clinic_id',  // FK in Treatment table
    targetKey: 'clinic_id',   // PK in Clinic table
    onDelete: 'CASCADE',      // Action when clinic is deleted
});

// Sync the model with the database
// sequelize.sync();  // Uncomment this line to sync

export default Treatment;
