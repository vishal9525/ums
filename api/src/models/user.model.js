const { v4 : uuidv4 } = require('uuid');
module.exports=(sequelize, Sequelize)=>{
    const User = sequelize.define('users', {
        userId: {
          type: Sequelize.UUID,
          unique:true,
          primaryKey: true
        },
        fullName:  {
          type: Sequelize.STRING,
          allowNull: false
        },
        adminId: {
            type: Sequelize.STRING,
            allowNull: false
          },
        appName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        status:{
            type: Sequelize.STRING,
            allowNull: false
          },
        mobileNo: {
            type: Sequelize.STRING,
            allowNull: false
          },
        emailId: {
            type: Sequelize.STRING,
            allowNull: false
          },
        jsonBody:{
          type:Sequelize.JSON
        }
      });
      User.beforeCreate(user=> {user.userId= uuidv4()});
      return User
}

