import joi from 'joi';


export const userSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email(),
    password: joi.string().required(),
    cpassword: joi.any().equal(joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
});