const { Sequelize } = require("sequelize");

const sequelize= new Sequelize ("ums",'root','ngh123vik', {
    host:'localhost',
    port:3306,
    dialect:'mysql'
})

console.log("connected to database");
const db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.admins=require('../src/models/admin.model')(sequelize,Sequelize)
db.users=require('../src/models/user.model')(sequelize,Sequelize)
db.auth=require('../src/models/auth.model')(sequelize,Sequelize)

module.exports = db;