var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');

routes(app);

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("app listening at http://%s:%s", host, port)
});
