const mongoose = require('mongoose');

module.exports.Activation = mongoose.model(
    'Activation',
    new mongoose.Schema(
        {
            emailHash: String,
        },
        {
            timestamps: true,
        },
    ),
);
