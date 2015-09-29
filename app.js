var express = require('express');
var bodyParser = require('body-parser');

var db = require('./db');
var config = require('./config').express;

var app = express();

app.use(bodyParser.json());
app.use(express.static('client'));

app.post('/db/:db',function(req,res) {
  
  db.query(req.params.db,req.body,function(err,result) {
    res.set({
      'Access-Control-Allow-Origin':'*'
    });
    if(err) {
       res.json({'err':err});
    } else {
       res.json(result);
    }
  });
});

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
