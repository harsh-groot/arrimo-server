const {renewUserToken} = require('../../models/user.model');


async function httpRenewToken(req,res) {

    await renewUserToken(req,res);      

}


module.exports = {
    httpRenewToken
}