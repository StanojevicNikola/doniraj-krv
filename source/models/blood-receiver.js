const mongoose = require('mongoose');

module.exports.Receiver = mongoose.model(
    'Receiver',
    new mongoose.Schema({
        bloodGroup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BloodGroup',
        },
    },
    {
        timestamps: true,
    }),
);
