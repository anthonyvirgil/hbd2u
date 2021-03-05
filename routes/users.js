const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');
const { loginValidation } = require('../validation');

// @route   POST api/users/register
// @desc    Registers a user
// @access  Public
router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if user already exists
	const emailExists = await User.findOne({ email: req.body.email });
	if (emailExists) return res.status(400).send('Email already exists');

	// Hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});

	try {
		const savedUser = await user.save().then((user) => {
			const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
			res.status(200).header('x-auth-token', token).send({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: token,
			});
		});
	} catch (error) {
		res.status(400).send(`Error occurred registering a user: ${error}`);
	}
});

// @route   POST api/users/login
// @desc    Authenticates a user
// @access  Public
router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if user exists
	const existingUser = await User.findOne({ email: req.body.email });
	if (!existingUser)
		return res.status(400).send('Email or password is incorrect');

	const validPassword = await bcrypt.compare(
		req.body.password,
		existingUser.password
	);

	if (!validPassword)
		return res.status(400).send('Email or password is incorrect');

	// Create and assign JWT
	const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);
	res.header('x-auth-token', token).json({
		id: existingUser._id,
		name: existingUser.name,
		email: existingUser.email,
		token: token,
	});
});

module.exports = router;
