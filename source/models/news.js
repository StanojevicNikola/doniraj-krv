const mongoose = require('mongoose');

module.exports.News = mongoose.model
(
	'News',
	new mongoose.Schema
	(
		{
			title: String,
			description: String,
			date: Date
		},
		{
			timestamps: true
		}
	)
);
