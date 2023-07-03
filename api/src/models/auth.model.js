const { v4 : uuidv4 } = require('uuid');
module.exports=(sequelize, Sequelize)=>{
    const Auth = sequelize.define('auth', {
        authId: {
          type: Sequelize.UUID,
          unique:true,
          primaryKey: true
        },
        userName:  {
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
        password:{
            type: Sequelize.STRING,
            allowNull: false
          }
      });
      Auth.beforeCreate(auth=> {auth.authId= uuidv4()});
      return Auth
}

