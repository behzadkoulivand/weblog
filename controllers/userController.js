const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            const error = new Error("کاربری با این ایمیل ثبت نشده است");
            error.statusCode = 422;
            throw error;
        }
            
        const isMatch = bcrypt.compare(password, user.password);

        if(!isMatch){
            // return res.status(400).json("کلمه عبور یا ایمیل اشتباه است");
            const error = new Error("کلمه عبور یا ایمیل اشتباه است");
            error.statusCode = 422;
            throw error;
        }
            
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, "secret", 
            {
                expiresIn: 3600
            }, (err, token) =>{
                if(err) throw err;
                res.status(200).json(token);
            });
    } catch (err) {
        next(err);
        
    }
}

exports.createUser = async (req, res, next) => {
    try {
        await User.userValidation(req.body);

        const { fullname, email, password } = req.body

        const user = await User.findOne({ email });

        if (user){
            // return res.status(422).json("کاربری با این ایمیل موجود است");
            const error = new Error("کاربری با این ایمیل موجود است");
            error.statusCode = 422;
            throw error;
        }
            
        await User.create({ fullname, email, password });
        res.status(200).json("عضویت با موفقیت انجام شد");
    } catch (err) {
        next(err);
    }
}