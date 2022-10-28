const Joi = require("joi");

const payment_validation = (data) => {
    const schema_validation = Joi.object({
        paymentID: Joi.string().required(),
        amount: Joi.number().integer().required(),
        email: Joi.string().required(),
        method: Joi.string().required(),
        cardNumber: Joi.string().required(),
        cvv: Joi.string().required(),
        expDate: Joi.string().required(),
    });

    return schema_validation.validate(data);
};

module.exports.payment_validation = payment_validation;