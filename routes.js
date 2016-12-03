module.exports = function(app) {
  'use strict';
  var router = app;
  var bodyParser = require('body-parser');
  var nodemailer = require('nodemailer');
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  router.get('/', function(req,res){
    res.sendFile(__dirname + '/views/index.html');
  });

  router.get('/views/failure.html', function(req,res){
    res.sendFile(__dirname + '/views/failure.html');
  });

  router.get('/views/success.html', function(req,res){
    res.sendFile(__dirname + '/views/success.html');
  });

  router.post('/', function(req,res){
    console.log(req.body);
    handleSendEmail(req,res);
    });

  function handleSendEmail(req,res)
  {
    if(req.email!=req.cemail){
      res.sendFile(__dirname + "/views/failure.html");
    }
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'Brooksby.Austin@gmail.com',
        pass: 'stoney14'
      }
    });
    var text = ('Confirmation email to %s %s from Austin Brooksbys contact page!', req.body.first_name, req.body.last_name);
    var mailOptions = {
      from: 'Brooksby.Austin@gmail.com',
      to: req.body.email,
      subject: 'Confirmation Email',
      text: text,
    };
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
        res.sendFile(__dirname + "/views/failure.html");
      }else{
        console.log('Message sent: ' + info.response);
        res.sendFile(__dirname + "/views/success.html");
      };
    });
  }
  return router;
};
