const mongoose = require('mongoose');

module.exports.Donor = mongoose.model(
    'Donor',
    new mongoose.Schema({
        blood: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blood',
        },
        geolocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Geolocation',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        lastDonation: Date,
    },
    {
        timestamps: true,
    }),
);
