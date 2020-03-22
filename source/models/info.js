const mongoose = require('mongoose');

module.exports.Info = mongoose.model
(
	'Info',
	new mongoose.Schema
	(
		{
			name: String,
			description: String
		},
		{
			timestamps: true
		}
	)
);
