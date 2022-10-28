const Joi = require("joi");

const user_validation = (data) => {
    const schema_validation = Joi.object({
        userID: Joi.string.required(),
        name: Joi.string.required(),
        email: Joi.string.required(),
        phoneNumber: Joi.string.required(),
        username: Joi.string.required(),
        password: Joi.string.required(),
        type: Joi.string.required(),
    });

    return schema_validation.validate(data);
};

module.exports.user_validation = user_validation;