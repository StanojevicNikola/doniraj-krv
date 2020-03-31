const mongoose = require('mongoose');

// TODO ask for capacity
module.exports.Place = mongoose.model(
    'Place',
    new mongoose.Schema({
        address: String,
        name: String,
        description: String,
        workingHours: String,
        date: Date,
        isStatic: Boolean,
        geolocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Geolocation',
        },
    },
    {
        timestamps: true,
    }),
);
