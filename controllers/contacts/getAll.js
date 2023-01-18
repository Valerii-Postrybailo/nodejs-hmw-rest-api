const {Contact} = require("../../models")

const getAll = async (req, res) => {
  const {_id} = req.user;
  const {page=1, limit = 20} = req.query;
  const {favorite} = req.query

  const skip = (page - 1) * limit;

  if (favorite != null){
    const result = await Contact.find({favorite: favorite});
    if (result.length === 0){
      res.status(404).json({
        status: "success",
        code:404,
        message : "Not found"
      })
    }
    if(result.length > 0){
      res.json({
        status: "success",
        code:200,
        data :{
          result
        }
      })
    }
  }
  if(!favorite){
    const result = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id email");
    if (result.length === 0){
      res.status(404).json({
        status: "success",
        code:404,
        message : "Not found"
      })
    }
    if(result.length > 0){
      res.json({
        status: "success",
        code:200,
        data :{
          result
        }
      })
    }
  }
}

module.exports = getAll;

