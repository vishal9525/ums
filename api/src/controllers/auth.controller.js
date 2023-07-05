'use strict';

const db = require("../../config/database");
const Auth=db.auth;
var authUtil = require('../utils/auth.util')
const jwt =require("jsonwebtoken");

module.exports.login = function login(req, res) {
        Auth.findOne({
            where: {userName: req.body.userName, status:"active"},raw:true
        }).then(admin=>{
            console.log("Login api call executed")
            if(!admin){
                return res.send(authUtil.loginFailureResponse("User Name does not exist."))
            }else{
               if(admin.password===req.body.password){
                 let token=jwt.sign({role:"admin",appName:admin.appName},"secret_code_to_create_token",{expiresIn:"1h"});
                 if(req.body.userName=='all-apps'){
                    token=jwt.sign({role:"superAdmin",appName:admin.appName},"secret_code_to_create_token",{expiresIn:"1h"});
                 }
                 res.send(authUtil.loginSuccessResponse(admin,token))
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