// models/Clinic.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';
import Organization from './Organization.js';  // Assuming Organization model exists

// Define the Clinic model
const Clinic = connection.define('Clinic', {
    clinic_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clinic_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    org_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: 'organizations',  // The referenced table name
            key: 'company_code',           // The referenced column
        },
        onDelete: 'SET NULL', // If the associated organization is deleted, set org_id to NULL
    },
   
    main_contact: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    website: {
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
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    image: {
        type: Sequelize.BLOB,  // Store image as binary
        allowNull: true,
    },
    location: {
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
    tableName: 'clinics',  // Ensure the table name matches
    timestamps: false,     // Disable auto timestamps if you manage them manually
});


// Sync the model with the database
// sequelize.sync();  // Uncomment this line to sync

export default Clinic;
