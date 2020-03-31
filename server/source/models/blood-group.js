const mongoose = require('mongoose');

module.exports.Blood = mongoose.model(
    'Blood',
    new mongoose.Schema({
        groupType: String,
    },
    {
        timestamps: true,
    }),
);
