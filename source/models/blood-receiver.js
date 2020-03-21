const mongoose = require('mongoose');

module.exports.Receiver = mongoose.model(
    'Receiver',
    new mongoose.Schema({
        bloodGroup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BloodGroup',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }),
);
