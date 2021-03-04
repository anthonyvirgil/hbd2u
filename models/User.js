const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
	birthDate: {
		type: Date,
		required: true,
	},
	registerDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);
