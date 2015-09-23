var sql = require('mssql');
var config = require('./config').db_config;

module.exports.query = function(content,cb) {
  console.log(content);
  var connection = new sql.Connection(config);
  connection.connect(function(err) {
    if(err) {
      connection.close();
      cb(err,null);
    }
    var ps = new sql.PreparedStatement(connection);
    var params = {};
    for(var key in content.params) {
      var type = sql.VarChar;
      ps.input(key,type);
      params[key]=content.params[key].value;
    }
    
    ps.prepare(content.query, function(err) {
      ps.execute(params, function(err, recordset) {
        if(err) cb(err,null);
        ps.unprepare(function(err) {
          cb(null,recordset);
        });
      });
    });
  });
};


