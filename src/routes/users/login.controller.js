const {verifyAndLoginUser} = require('../../models/user.model');


async function httpLoginUser(req,res) {
    const {identifier, password} = req.body;    
    
    if(!(identifier && password)){
        return res.status(400).json({
            error: "Missing required user name or password"
        });
    }
    
    
    await verifyAndLoginUser(req,res);   

}


module.exports = {
    httpLoginUser
}