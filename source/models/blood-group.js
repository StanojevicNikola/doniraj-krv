const mongoose = require('mongoose');

module.exports.BloodGroup = mongoose.model(
    'BloodGroup',
    new mongoose.Schema({
        groupType: String,
    },
    {
        timestamps: true,
    }),
);
