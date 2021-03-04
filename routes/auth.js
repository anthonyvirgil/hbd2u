const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../validation');

// @route   POST api/auth/login
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
		user: {
			id: existingUser._id,
			name: existingUser.name,
			email: existingUser.email,
		},
	});
});

module.exports = router;
