module.exports.createAuthRequest = function (req) {
    return authRequest={
        userName: req.appName,
        adminId:req.adminId,
        appName:req.appName,
        status:'pending',
        mobileNo:req.jsonBody.libraryContactNo,
        emailId:req.jsonBody.libraryEmail,
        password:'123abc',
        createdAt:new Date().getTime(),
        updatedAt:new Date().getTime()
    }
}
module.exports.updateAuthRequest = function (id,req) {
    return authRequest={
        userName: req.body.appName,
        adminId:id,
        appName:req.body.appName,
        mobileNo:req.body.jsonBody.libraryContactNo,
        emailId:req.body.jsonBody.libraryEmail,
        updatedAt:new Date().getTime()
    }
}
module.exports.loginFailureResponse= function(body){
    return{
        status:"failed",
        message:body
    }
}
module.exports.loginSuccessResponse= function(body,token){
    return{
        status:"success",
        adminId:body.adminId,
        token:token,
        expiresIn:3600
    }
}