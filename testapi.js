var unirest = require("unirest");
var mysql      = require('mysql');

var req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");


var connection = mysql.createConnection({
  host     : '35.223.207.83',
  user     : 'root',
  password : 'npmgak@2020#'
});


req.query({
	"country": "india"
});
req.headers({
	"x-rapidapi-host": "covid-193.p.rapidapi.com",
	"x-rapidapi-key": "36191329b7mshcbbefaca44e0129p11f24djsn5d13d22f2b25"
});

 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    connection.query("CREATE DATABASE coviddb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body.response);
        connection.end();
    });
    //console.log('connected as id ' + connection.threadId);
  });

  