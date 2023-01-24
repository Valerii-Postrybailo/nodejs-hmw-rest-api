const { User } = require("../../models");

const path = require("path");
const fs = require('fs').promises;
const Jimp = require('jimp');


const avatarDir = path.join(__dirname, "../../", "public", "avatars")

const updataAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  

  const { _id: id } = req.user;
  const originalImgName = `${id}_${originalname}`;
  

  try {
    const resultUpload = path.join(avatarDir, originalImgName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", originalImgName);

    Jimp.read(avatarURL)
      .then(avatar => {
      
      console.log("jimp worked")

      return avatar
        .resize(250, 250) // resize
        .write(resultUpload); // save
    })
    .catch(err => {
      console.error(err);
    });
    
    console.log("avatarURL", avatarURL)
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({
      "avatarURL" : avatarURL
    })

  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
}

module.exports = updataAvatar;