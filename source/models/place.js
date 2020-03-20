const mongoose = require('mongoose');

// Compile model from schema
module.exports.Place = mongoose.model(
    'Place',
    new mongoose.Schema({
        address: String,
        city: String,
        name: String,
        lat: String,
        lng: String,
        description: String,
        workingHours: String,
        date: Date,
        isStatic: Boolean,
    },
    {
        timestamps: true,
    }),
);
