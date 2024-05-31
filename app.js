const express=require("express");
const mysql=require("mysql");
const doenv=require("dotenv");
const path=require("path");
const hbs=require("hbs");
const cookieParser = require("cookie-parser");
const  nodemailer = require('nodemailer');

const app=express();

doenv.config({
    path:"./.env",
});
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
   
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Mysql connection success");
    }
});

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

const location=path.join(__dirname,"./public");
app.use(express.static(location));
app.set("view engine","hbs")


 app.use("/auth", require("./routes/auth")); 

 app.use('/',require('./routes/pages'));          

app.listen(700, () => {
    console.log("Server started @ Port 700");

});
//var nodemailer = require('nodemailer');
//app.post('/feedback',(req,res)=>{
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ceg.success.2023@gmail.com',
    pass: 'yyegdudvjpsrchmj'
  }
});

const mailOptions = {
  from: 'kaviyabanu1997@gmail.com',
  to: 'ceg.success.2023@gmail.com',
  subject: "Nodemailer Test",
  text:"hello" ,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

//});