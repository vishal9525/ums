const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db= require("../config/database");
var cors = require('cors');

const Admin = require('./models/admin.model')(db.sequelize, db.Sequelize);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options('*',cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

 async function createTable() {
  try {
    await db.sequelize.authenticate();
    await Admin.sync({ force: true });
    console.log('Table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    await db.sequelize.close();
  }
}

//createTable(); 


let adminRouter = require('./routes/admin.router');
let authRouter = require('./routes/auth.router')

console.log('--api started--');

app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.use((error,req,res,next)=>{
  res.status(error).send({
    error:{
      status:error.status ||500,
      message: error.message || 'Internal Server Error'
    }
  })
  console.log("Error in app.js---",error)
})

module.exports = app;
