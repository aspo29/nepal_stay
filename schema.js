const joi = require('joi');

module.exports.accommodationSchema = joi.object({
    accommodation: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow("", null),
    }).required(),
});