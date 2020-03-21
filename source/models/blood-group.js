const mongoose = require('mongoose');

module.exports.BloodGroup = mongoose.model(
    'BloodGroup',
    new mongoose.Schema({
        type: String,
        rhesusFactor: String,
    },
    {
        timestamps: true,
    }),
);
