const Joi = require("joi");

const inspection_validation = (data) => {
    const schema_validation = Joi.object({
        inspectionId: Joi.string(),
        routeId: Joi.string().required(),
        time: Joi.string().required(),
        date: Joi.string().required(),
        inspectorName: Joi.string().required(),
        enquiries: Joi.string().required(),
    });

    return schema_validation.validate(data);
};

module.exports.inspection_validation = inspection_validation;