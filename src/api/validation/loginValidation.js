const Joi = require("joi");

const login_validation = (data) => {
	const schema_validation = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
	});

	return schema_validation.validate(data);
};

module.exports.login_validation = login_validation;