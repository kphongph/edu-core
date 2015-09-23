var db = require('./db');

var test = {
  query:'select * from Employee',
  params:{}
};

for(var i=0;i<100;i++) {
  db.query(test,function(err, result) {
    if(!err) {
      if(result) {
        console.log(result.length);
      }
    }
  });
}
