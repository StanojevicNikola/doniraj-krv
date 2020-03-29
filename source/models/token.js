const mongoose = require('mongoose');

module.exports.Token = mongoose.model(
    'Token',
    new mongoose.Schema({
        iat: Number,
        exp: Number,
        rawToken: String,
        data: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true,
    }),
);
