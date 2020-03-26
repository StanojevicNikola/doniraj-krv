const mongoose = require('mongoose');

// groups can be all or compatible
module.exports.Request = mongoose.model(
    'Request',
    new mongoose.Schema({
        radius: Number,
        geolocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Geolocation',
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipient',
        },
        groups: [String],
        searchFor: String,
    },
    {
        timestamps: true,
    }),
);
