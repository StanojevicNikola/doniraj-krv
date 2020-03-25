const mongoose = require('mongoose');

module.exports.Token = mongoose.model(
    'Token',
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        iat: Number,
        exp: Number,
        rawToken: String,
        data: mongoose.Schema.Types.Mixed,
        isActive: Boolean,
    },
    {
        timestamps: true,
    }),
);
