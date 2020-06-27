const mongoose = require('mongoose');

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
        roles: [String],
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Donor',
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipient',
        },
    },
    {
        timestamps: true,
    }),
);
