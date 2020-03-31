const mongoose = require('mongoose');

module.exports.Geolocation = mongoose.model(
    'Geolocation',
    new mongoose.Schema({
        city: String,
        lat: String,
        lng: String,
    },
    {
        timestamps: true,
    }),
);
