const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            const error = new Error("کاربری با این ایمیل ثبت نشده است");
            error.statusCode = 404;
            throw error;
        }
            
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = jwt.sign(
                {
                    user: {
                        userId: user._id.toString(),
                        email: user.email,
                        fullname: user.fullname,
                    },
                },
                process.env.JWT_SECRET
            );
            res.status(200).json({ token, userId: user._id.toString() });
        } else {
            const error = new Error("آدرس ایمیل یا کلمه عبور اشتباه است");
            error.statusCode = 422;
            throw error;
        }
            
        
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