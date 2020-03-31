const mongoose = require('mongoose');

module.exports.Recipient = mongoose.model(
    'Recipient',
    new mongoose.Schema({
        blood: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blood',
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
