var mysql = require('mysql');

var con = mysql.createConnection({
  host     : '35.223.207.83',
  user     : 'root',
  password : 'npmgak@2020#',
  database: "coviddb"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE table1_covid_19 (id INT AUTO_INCREMENT PRIMARY KEY, name_Country VARCHAR(255), cases_new VARCHAR(10), cases_active int(20), cases_recovered int(20), cases_total int(20), deaths_new VARCHAR(10), deaths_total int (20))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});