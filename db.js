var sql = require('mssql');
var config = require('./config').db_config;

module.exports.query = function(content,cb) {
  var connection = new sql.Connection(config);
  connection.connect(function(err) {
    if(err) {
      connection.close();
      cb(err,null);
    }
    var ps = new sql.PreparedStatement(connection);
    ps.prepare(content.query, function(err) {
      ps.execute(content.params, function(err, recordset) {
        if(err) cb(err,null);
        ps.unprepare(function(err) {
          cb(null,recordset);
        });
      });
    });
  });
};


