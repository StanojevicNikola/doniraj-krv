const mongoose = require('mongoose');

module.exports.Request = mongoose.model(
    'Request',
    new mongoose.Schema({
        radius: Number,
        geolocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Geolocation',
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
