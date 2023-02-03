const {User} = require('../../models');
const {sendEmail} = require('../../helpers');

const { v4: uuidv4 } = require('uuid')

const resendEmail = async(req,res) =>{
  const {email} = req.body;
  // console.log(req.params)
  if(!email){
    res.status(400).json({
      message: 'Missing required field email'
    })
  }else{
    const user = await User.findOne({email});
    // console.log(user)
    if(user && user.verify !== true){
      const verificationToken = uuidv4();
      await User.findByIdAndUpdate(user._id, {verify:true,verificationToken:null})

      const mail = {
        to:email,
        subject: "Confirm email",
        html:`<a target= "_blank"href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email </a>`
      };

      await sendEmail(mail);

      res.status(200).json({
        message: 'Verification email sent'
      })
  } else {
    if(!user){
      res.status(404).json({
        message: 'There is no such user in the system'
        })
    }else{
      res.status(400).json({
        message: 'Verification has already been passed'
        })
      }
    }
  }
}


module.exports = resendEmail;