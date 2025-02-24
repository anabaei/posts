// models/Organization.js
import connection from '../db/connection.js';  // Your Sequelize connection
import Sequelize from 'sequelize';

// Define the Organization model
const Organization = connection.define('Organization', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,  // user_id is required to link to the user (admin/creator)
        references: {
            model: 'users',  // Reference the 'users' table
            key: 'user_id',  // Reference the 'user_id' field in the 'users' table
        },
        onDelete: null,
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    company_code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
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
    tableName: 'organizations',  // Ensure the table name matches
    timestamps: false,  // Disable auto timestamps if you manage them manually
});

// Sync the model with the database
// sequelize.sync();  // Uncomment this line to sync

export default Organization;
