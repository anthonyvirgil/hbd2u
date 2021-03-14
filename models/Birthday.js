const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	birthDate: {
		type: Date,
		required: true,
	},
	birthMonth: {
		type: Number,
		required: true,
	},
	birthDay: {
		type: Number,
		required: true,
	},
	imageURL: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
	},
});

module.exports = mongoose.model('Birthday', birthdaySchema);
