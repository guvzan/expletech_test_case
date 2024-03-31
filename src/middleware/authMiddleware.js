const jwt = require('jsonwebtoken');
const User = require('../src/models/User');
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
                next();
            }
        });
    } else{
        // If there will be login page -- change redirect to go there
        res.redirect('/');
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (token){
            jwt.verify(token, jwtSecret, async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    req.currentUser = null;
                    throw new Error("JWT verification failed!")
                } else {
                    req.currentUser = await User.findById(decodedToken.id);
                    next();
                }
            });
        } else{
            req.currentUser = null;
            throw new Error("JWT verification failed!")
        }
    } catch(e) {
        console.log(e);
        res.status(401).json({ error: 'Unauthorized' });
    }
};


const checkRole = (roles) => {
    return (req, res, next) => {
        if (req.currentUser.role && roles.includes(req.currentUser.role)) {
            next();
        } else {
            res.status(403).json({ error: 'You do not have access to this endpoint!' });
        }
    };
};


module.exports = {
    requireAuth,
    getCurrentUser,
    checkRole
}