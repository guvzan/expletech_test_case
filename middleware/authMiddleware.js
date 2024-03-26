const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const jwtSecret = process.env.JWT_SECRET;
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err){
                console.log(err.message);
                // If there will be login page -- change redirect to go there
                res.redirect('/');
            } else{
                // console.log('Logged in! Token:', decodedToken);
                next();
            }
        });
    } else{
        // If there will be login page -- change redirect to go there
        res.redirect('/');
    }
}

const getCurrentUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                req.currentUser = null;
                next();
            } else {
                req.currentUser = await User.findById(decodedToken.id);
                next();
            }
        });
    } else{
        req.currentUser = null;
        next();
    }
};


module.exports = {
    requireAuth,
    getCurrentUser
}