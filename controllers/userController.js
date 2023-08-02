const User = require('../models/User');

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