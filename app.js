var express = require('express');
var config = require('./config').express;

var app = express();

app.use(express.static('client'));

app.get('/', function (req, res) {
  res.json({'status':'ok'});
});

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
