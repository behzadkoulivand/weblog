const User = require('../models/User');

exports.createUser = async (req, res)=> {
    await userValidation(req.body);

    const {fullname, email, password} = req.body

    const user = await User.findOne({email});

    if(user)
        return res.status(422).json("کاربری با این ایمیل موجود است");

    await User.create({fullname, email, password});
    res.status(200).json("عضویت با موفقیت انجام شد");
}