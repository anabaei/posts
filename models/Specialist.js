// models/Specialist.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';
import Clinic from './Clinic.js';  // Assuming the Clinic model is already defined

// Define the Specialist model
const Specialist = connection.define('Specialist', {
    specialist_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,  // Ensures it's a valid email format
        }
    },
    image: {
        type: Sequelize.STRING,  // URL to the specialist's image
        allowNull: true,
    },
    clinics_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'clinics',  // Reference the 'clinics' table
            key: 'clinic_id',  // The clinic's primary key
        },
        onDelete: 'SET NULL',  // If the associated clinic is deleted, set this FK to NULL
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
    tableName: 'specialists',  // Ensure the table name matches
    timestamps: false,         // Disable auto timestamps if you manage them manually
});

// Define the relationship between Specialist and Clinic (Foreign Key)
Specialist.belongsTo(Clinic, {
    foreignKey: 'clinics_id',   // FK in Specialist table
    targetKey: 'clinic_id',     // PK in Clinic table
    onDelete: 'SET NULL',        // Action when the associated clinic is deleted
});

// Sync the model with the database
// sequelize.sync();  // Uncomment this line to sync

export default Specialist;
