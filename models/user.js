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

  verify: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },

},{versionKey: false, timestamps:true});

// const joiSchema = Joi.object({
//   password: Joi.string().required(),
//   email: Joi.string().required(),
//   subscription : Joi.string().min(6).required()
// })

const User = model("user", userShema);

module.exports = User
