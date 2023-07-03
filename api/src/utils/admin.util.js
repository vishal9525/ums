module.exports.createAdminRequest = function (req) {
    return adminRequest={
        serviceName: req.body.serviceName,
        serviceType:req.body.serviceType,
        appName:req.body.appName,
        status:req.body.status,
        serviceCapacity:req.body.serviceCapacity,
        jsonBody:req.body.jsonBody,
        createdAt:new Date().getTime(),
        updatedAt:new Date().getTime()
    }
}