const mongoose = require('mongoose');

module.exports.Storage = mongoose.model(
    'Storage',
    new mongoose.Schema({
        place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place',
        },
        blood: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blood',
        },
        amount: Number,
    },
    {
        timestamps: true,
    }),
);
