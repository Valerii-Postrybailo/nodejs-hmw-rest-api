const {model, Schema} = require("mongoose");

const userShema = Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },

  token: String,

  avatarURL: String,

},{versionKey: false, timestamps:true});

// const joiSchema = Joi.object({
//   password: Joi.string().required(),
//   email: Joi.string().required(),
//   subscription : Joi.string().min(6).required()
// })

const User = model("user", userShema);

module.exports = User
