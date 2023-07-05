'use strict';

const db = require("../../config/database");
const Admins= db.admins;
const Auth=db.auth;
const { Op } = require('sequelize');
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
module.exports.getSingalAdminDetails = function getSingalAdminDetails(req, res){
    Admins.findByPk(req.params.adminId).then(response=>{
        console.log('getSingalAdminDetails api call executed')
        res.send(response)
    }).catch(response=>{
        console.log("Error in adminController: getSingalAdminDetails---",response)
        returnError(response, res)
    })
}
module.exports.getAllAppDetails = function getAllAppDetails(req,res){
     Admins.findAll({where: {serviceType: { [Op.ne]: 'superAdmin' }},attributes: ['adminId', 'appName','status','createdAt'],raw:true}).then(response=>{
        console.log('getAllAppDetails api call executed')
        res.send(response)
     }).catch(response=>{
        console.log("Error in adminController: getAllAppDetails---",response)
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