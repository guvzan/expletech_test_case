const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', username: '', password: ''}

    if (err.code === 11000){
        errors['email'] = 'This email is already registered';
        return errors;
    }

    if (err.message === "Invalid email"){
        errors.email = "No such email registered";
    }

    if(err.message === "Invalid password"){
        errors.password = "Passwords don`t match";
    }

    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

const maxAge = 60 * 60 * 24;
const createJWTToken = (id) => {
    return jwt.sign({id}, 'fortune rabbit review globe document system', {
        expiresIn: maxAge
    })
}

const post_signup = async (req, res) => {
    const {username, email, password} = req.body

    try{
        const user = await User.create({username, email, password});
        const token = createJWTToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id})
    } catch (err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

const post_login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const token = createJWTToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    } catch(err){
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

const get_logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports = {
    post_signup,
    post_login,
    get_logout
}