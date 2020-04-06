var mysql = require('mysql');

var con = mysql.createConnection({
  host     : '35.223.207.83',
  user     : 'root',
  password : 'npmgak@2020#',
  database: "coviddb"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE table_covid";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});

