const { v4 : uuidv4 } = require('uuid');
module.exports=(sequelize, Sequelize)=>{
    const Admin = sequelize.define('admins', {
        adminId: {
          type: Sequelize.UUID,
          unique:true,
          primaryKey: true
        },
        serviceName:  {
          type: Sequelize.STRING,
          allowNull: false
        },
        serviceType: {
          type: Sequelize.STRING,
          allowNull: false
        },
        appName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique:true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
          },
        serviceCapacity:{
          type: Sequelize.STRING,
          allowNull: false
        },
        jsonBody:{
          type:Sequelize.JSON
        }
      });
      Admin.beforeCreate((admin) => {
        if (!admin.adminId) {
          admin.adminId = uuidv4();
        }
      });
      return Admin
}

