const Joi = require("joi");

const token_validation = (data) => {
    const schema_validation = Joi.object({
        tokenId: Joi.string.required(),
        expireDate: Joi.string.required(),
    });

    return schema_validation.validate(data);
};

module.exports.token_validation = token_validation;