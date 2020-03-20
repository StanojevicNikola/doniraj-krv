const mongoose = require('mongoose');

// Compile model from schema
module.exports.User = mongoose.model(
    'User',
    new mongoose.Schema({
        email: String,
        emailHash: String,
        name: String,
        username: String,
        passwordHash: String,
        roles: [String],
        isAdmin: Boolean,
        isActive: Boolean,
    },
    {
        timestamps: true,
    }),
);
