const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, 'fortune rabbit review globe document system', (err, decodedToken) => {
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

module.exports = {
    requireAuth
}