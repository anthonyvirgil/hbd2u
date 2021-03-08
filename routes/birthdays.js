const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { birthdayValidation } = require('../validation');

// Birthday model
const Birthday = require('../models/Birthday');

const DEFAULT_IMAGE_URL =
	'https://firebasestorage.googleapis.com/v0/b/hbd2u-e831b.appspot.com/o/g3z0haxobh141.jpg?alt=media&token=6ee83f3f-d352-4af6-9d58-84d6f8dac5b9';

// @route   POST api/birthdays
// @desc    Retrieves all birthdays
// @access  Public
router.get('/', auth, (req, res) => {
	if (req.query.userId) {
		Birthday.find({ userId: req.query.userId })
			.sort({ birthDate: -1 })
			.then((items) => res.json(items));
	} else {
		Birthday.find()
			.sort({ birthDate: -1 })
			.then((items) => res.json(items));
	}
});

// @route   GET api/birthdays/:id
// @desc    Retrieve a birthday
// @access  Public
router.get('/:id', auth, async (req, res) => {
	try {
		const birthday = await Birthday.findById(req.params.id);
		if (birthday) {
			res.status(200).json(birthday);
		} else {
			res.status(400).send(`Cannot find birthday with id ${req.params.id}`);
		}
	} catch (error) {
		res.status(400).send(`Error occurred retrieving birthday: ${error}`);
	}
});

// @route   POST api/birthdays
// @desc    Create a Birthday
// @access  Public
router.post('/', auth, (req, res) => {
	const { error } = birthdayValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	if (!req.body.imageURL) {
		req.body.imageURL = DEFAULT_IMAGE_URL;
	}

	const newBirthday = new Birthday({
		name: req.body.name,
		birthDate: new Date(req.body.birthDate), // mm/dd/yyyy
		imageURL: req.body.imageURL,
		userId: mongoose.Types.ObjectId.createFromHexString(req.body.userId),
	});

	try {
		newBirthday.save().then((birthday) => res.status(200).json(birthday));
	} catch (error) {
		res.status(400).send(`Error occurred adding a birthday: ${error}`);
	}
});

// @route   DELETE api/birthdays/:id
// @desc    Delete an Item
// @access  Public
router.delete('/:id', auth, (req, res) => {
	Birthday.findById(req.params.id)
		.then((birthday) =>
			birthday.remove().then(() => res.json({ success: true }))
		)
		.catch((error) => res.status(404).json({ success: false }));
});

module.exports = router;
