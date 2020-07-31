const joi = require('@hapi/joi');

const userDataSchema = joi.object({
    name: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().min(6).max(30)
})

const validate = (req,res,next) => {
    req.body.name = req.body.name.trim();
    req.body.password = req.body.password.trim();
    const {error} = userDataSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}

module.exports = validate;

