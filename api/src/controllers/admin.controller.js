'use strict';

const db = require("../../config/database");
const Admins= db.admins;
const Auth=db.auth;
var adminUtil = require('../utils/admin.util')
var authUtil = require('../utils/auth.util')

module.exports.createAdmin = function createAdmin(req, res) {
    Admins.create(adminUtil.createAdminRequest(req)).then(function (response){
        console.log("createAdmin api call executed")
        Auth.create(authUtil.createAuthRequest(response)).then(function(resp){
        console.log("authCreate api call executed")
        res.send(resp);
        }).catch(function(response){
         console.log("Error in adminController: createAuth---",response)
        returnError(response, res)
        })
    }).catch(function (response){
     console.log("Error in adminController: createAdmin---",response)
     returnError(response, res)
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