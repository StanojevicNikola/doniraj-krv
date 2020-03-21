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
        isAdmin: Boolean,
        isActive: Boolean,
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Donor',
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Receiver',
        },
    },
    {
        timestamps: true,
    }),
);
