const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please provide a valid email']
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        minlength: [3, 'Your username should contain 3 or more symbols']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Your password should contain 8 or more symbols']
    }
});

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user
        }
        throw Error('Invalid password');
    }
    throw Error('Invalid email');
}

const User = mongoose.model('user', userSchema);
module.exports = User;