const mongoose = require('mongoose');

module.exports.BloodGroup = mongoose.model(
    'BloodGroup',
    new mongoose.Schema({
        type: String,
    },
    {
        timestamps: true,
    }),
);
