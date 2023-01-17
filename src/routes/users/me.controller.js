const jwt_decode = require("jwt-decode");
const {User} = require('../../models/user.mongo');


async function httpMeUser(req,res) {

  const token = req?.body?.jwt || req?.query?.jwt || req?.headers['x-access-token']    
  const payload = jwt_decode(token);
  
  await User.find({ $or: [{ username: payload?.username }, { email: payload?.email }] }).exec(async (err, user) => {
    if(err){
        res.status(500).send({message: err});
        return
    }

    if(user.length > 0){ 
        const [_user] = user;           
        return res.status(200).json({
            id:_user?._id,
            username:_user?.username,
            email:_user?.email,
            confirmed:_user?.confirmed,
            blocked:_user?.blocked,   
            createdAt:_user?.createdAt,
            updatedAt:_user?.updatedAt
        });
      }  
  })
}

module.exports = {
    httpMeUser
}
