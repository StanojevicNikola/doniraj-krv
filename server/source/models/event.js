const mongoose = require('mongoose');

module.exports.Event = mongoose.model(
    'Event',
    new mongoose.Schema(
        {
            title: String,
            description: String,
            date: Date,
            hour: String,
            geolocation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Geolocation',
            },
        },
        {
            timestamps: true,
        },
    ),
);
