const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const url = require('url');
const os = require('os');

const {displayDateTime} = require('./DisplayDateTime');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get("/", function(req, res)  {

    
    const username = os.hostname();
    const pageUrl = req.url;
    const checkingTime = displayDateTime();
    const content = `User:${username} time:${checkingTime} CheckPage:${pageUrl} \r\n`;

    fs.appendFile('usertrack.txt',content,(e) =>{
        if(e){
            console.log(e)
        }
        console.log('Saved!')
    });

    res.sendFile(path.join(__dirname + "/index.html"));
   });

app.get('/contact', function(req,res) {

    const username = os.hostname();
    const pageUrl = req.url;
    const checkingTime = displayDateTime();
    const content = `User:${username} time:${checkingTime} CheckPage:${pageUrl} \r\n`;

    
    fs.appendFile('usertrack.txt',content,(e) =>{
        if(e){
            console.log(e)
        }
        console.log('Saved!')
    });

    res.sendFile(path.join(__dirname + '/contact.html'))
});

app.get('/about', function(req,res) {

    const username = os.hostname();
    const pageUrl = req.url;
    const checkingTime = displayDateTime();
    const content = `User:${username} time:${checkingTime} CheckPage:${pageUrl} \r\n`;

    
    fs.appendFile('usertrack.txt',content,(e) =>{
        if(e){
            console.log(e)
        }
        console.log('Saved!')
    });

    res.sendFile(path.join(__dirname + '/about.html'))
});

app.post('/contact', function(req,res) {

    const username = os.hostname();
    const pageUrl = req.url;
    const checkingTime = displayDateTime();
    const content = `User:${username} time:${checkingTime} CheckPage:${pageUrl} \r\n`;

    
    fs.appendFile('usertrack.txt',content,(e) =>{
        if(e){
            console.log(e)
        }
        console.log('Saved!')
    });

    const adr = req.url;
    const q = url.parse(adr, true);
    const qdata = q.query;
     console.log(qdata);
    
    // res.write(qdata);
    const msg =
      "<p>First name:" +
      req.body.firstname + '\r\n </p>' +
      "<p>last name:" +
      req.body.lastname + '\r\n </p>'
      +"<p>Email:" +
      req.body.Email + '\r\n </p>'
      + "<p>Message:" +
      req.body.Message; '\r\n </p>'
      console.log(msg);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "yasir269050@gmail.com",
          pass: "*********"
        }
      });
   
      var mailOptions = {
        from: "yasir269050@gmail.com",
        to: "yasir269050@yahoo.com",
        subject: "Sending Email using Express with user information submitted via form",
        html: msg
      };
   
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
        //   res.write(error);
          res.end();
        } else {
          res.write("Email sent. Thanks for your information. We will be back soon! :) " + info.response);
          res.end();
        }
      });



});


app.listen(3002)
console.log('Server is running on port 3002....')

