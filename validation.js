const Joi = require('@hapi/joi');

// User registration validation
const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});

	return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});

	return schema.validate(data);
};

const birthdayValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		birthDate: Joi.string()
			.regex(/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/)
			.required(),
		imageURL: Joi.string().allow(''),
		userId: Joi.string().required(),
	});

	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.birthdayValidation = birthdayValidation;
