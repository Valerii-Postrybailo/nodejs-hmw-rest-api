const {User} = require("../../models");
const {sendEmail} = require('../../helpers');
const Joi = require('joi');
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require('uuid')



const register = async(req,res) => {

  const {email, password} = req.body;
  const user = await User.findOne({email});

  // console.log("user", user)
  if (user != null){
    res.status(409).json({
      "status": 409,
      "message": "Email in use"
    })
  }

  if(!email || !password){
    res.status(400).json({
      code: 404,
      message:"missing fields",
    })
  } else {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email).toString();

    const verificationToken = uuidv4();
    const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
    // console.log(result)

    const mail = {
      to:email,
      subject: "Confirm email",
      html:`<a target= "_blank"href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email </a>`
    };

    await sendEmail(mail);

    const joiShema = Joi.object({
      _id: Joi.required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().required(),
      subscription: Joi.string().required(),
      avatarURL: Joi.string().required(),
      verify: Joi.boolean().required(),
      verificationToken: Joi.string().required(),

      createdAt: Joi.date(),
      updatedAt: Joi.date()
  
  })

  const {error, value} = joiShema.validate(result.toObject());
  
  if (error) {
    console.log(error.message)
  }

  if (!error && value){
    res.status(201).json({
      status: 'success',
      code: 201,
      user:{
        "email" : result.email,
        "password": result.password,
        "subscription": result.subscription,
        "avatar" : result.avatarURL,

        "verificationToken" : result.verificationToken,
        "verify": result.verify,
      }

  })} else {
    const errorMsg = error.message

    res.status(400).json({
      status: 'success',
      code: 400,
      error: errorMsg
      });
    }
  }
}

module.exports = register;