const {User} = require("../../models");
const Joi = require('joi');
const bcrypt =require("bcryptjs");
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env;

const login = async (req, res) => {

  const { email, password } = req.body;
  console.log("res", res.email)
  const userData = req.body;
  console.log("email", email)

  const user = await User.findOne({ email });
  console.log("user email", user.email)
  if(!email || !password){
    res.status(400).json({
      code: 404,
      message:"missing fields",
    })
  } else {

    const joiShema = Joi.object({
      password: Joi.string().min(6).required(),
      email: Joi.string().required()
    })
    
    const {error} = joiShema.validate(userData);

    if(error){
      console.log(error.message)
        const errorMsg = error.message

        res.status(400).json({
          status: 'success',
          code: 400,
          error: errorMsg
        });
      }

    if(!user && !error){

      res.status(401).json({
        "status": 401,
        "message": "Email or password is wrong"
      })
    }
    
    if(user && !error){

      const passCompare = bcrypt.compareSync(password, user.password);
      console.log("password", password)
      console.log("user_pass", user.password)
      console.log("passCompare", passCompare)
      if(!passCompare){
        res.status(401).json({
          "status": 401,
          "message": "Email or password is wrong"
        });

    } else{

      const payload = {
          id: user._id
        }
        
        console.log("payload", payload)
        console.log("key", SECRET_KEY)
      const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
      await User.findByIdAndUpdate(user._id, {token});

      res.status(200).json({
        status: 'success',
        code: 200,
        token : token,
        user:{
          "email" : user.email,
          "subscription": user.subscription
        }
    })}
    }
  }
}

module.exports = login;