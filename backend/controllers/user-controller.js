const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.singup = async (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    let isEmailExists = await User.checkEmailExists(user.email);

    if (isEmailExists) {
        res.status(400).json({sts: -1, error: 'Email already exists'})
    } else {
        
        let savedDoc = await user.save();

        if (savedDoc) {
            res.status(200).json({sts: 1});
        } else {
            console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
        }
    }
}

exports.signin = async (req, res, next) => {
    const user = await User.login(req.body.email);
    console.log(req.body.password);
    console.log(user.password);
    console.log(bcrypt.compareSync(req.body.password, user.password));
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        user.password = undefined; 
        user.token = token;
        res.status(200).json({sts: 1, user: user});
    } else {
        res.status(401).json({sts: -1, error: 'Username or password incorrect'});
    }
}
