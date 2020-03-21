const mongoose = require('mongoose');

module.exports.Donor = mongoose.model(
    'Donor',
    new mongoose.Schema({
        bloodGroup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BloodGroup',
        },
        geolocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Geolocation',
        },
        lastDonation: Date,
    },
    {
        timestamps: true,
    }),
);
