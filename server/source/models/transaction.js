const mongoose = require('mongoose');

module.exports.Transaction = mongoose.model(
    'Transaction',
    new mongoose.Schema({
        place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        blood: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blood',
        },
        operation: String,
        amount: Number,
        date: Date,
    },
    {
        timestamps: true,
    }),
);
