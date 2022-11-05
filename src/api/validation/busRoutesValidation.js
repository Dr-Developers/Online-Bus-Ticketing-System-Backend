const Joi = require("joi");

const busRoutes_validation = (data) => {
    const schema_validation = Joi.object({
        timetableID: Joi.string().required(),
        vehicleNo: Joi.string().required(),
        routeId: Joi.string().required(),
        time: Joi.string().required(),
        date: Joi.string().required(),
        startLocation: Joi.string().required(),
        EndLocation: Joi.string().required(),
    });

    return schema_validation.validate(data);
};


module.exports.busRoutes_validation = busRoutes_validation;