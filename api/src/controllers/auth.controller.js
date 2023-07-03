'use strict';

const db = require("../../config/database");
const Auth=db.auth;
var authUtil = require('../utils/auth.util')
const jwt =require("jsonwebtoken");

module.exports.login = function login(req, res) {
    Auth.findOne({
        where: {userName: req.body.userName, status:"active"},raw:true
    }).then(user=>{
        console.log("Login api all executed")
        if(!user){
            return res.send(authUtil.loginFailureResponse("User Name does not exist."))
        }else{
           if(user.password===req.body.password){
             const token=jwt.sign({role:"admin", userId:user.authId},"secret_code_to_create_token",{expiresIn:"1h"});
             res.send(authUtil.loginSuccessResponse(user,token))
           }else{
            return res.send(authUtil.loginFailureResponse("Password is not correct"));
           }
        }
    })
    .catch(response=>{
        console.log("Error in authController: login---",response)
        returnError(response,res)
    })
}

function returnError(response,res){
    res.status(response.status || 500 ).send({
        error:{
            status:error.status ||500,
            message: error.message || 'Internal Server Error'
          },
    });
}