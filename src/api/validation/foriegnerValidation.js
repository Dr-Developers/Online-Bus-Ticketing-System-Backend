const Joi = require("joi");

const foreigner_validation = (data) => {
	const schema_validation = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		nicType: Joi.string().required(),
		number: Joi.string().required(),
		phoneNumber: Joi.string().required(),
		username: Joi.string().required(),
		password: Joi.string().required(),
		type: Joi.string().required(),
	});

	return schema_validation.validate(data);
};

module.exports.foreigner_validation = foreigner_validation;
