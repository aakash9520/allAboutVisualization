var unirest = require("unirest");
var mysql   = require('mysql');

//endpoint values are countries, statistics , countries : as per rapidapi
 function EndPointSel(endpoint="statistics",queryvalue="india")
{
  const restep = "https://covid-193.p.rapidapi.com/" + endpoint;
  var req = unirest("GET", restep);

  var storedresp;

  req.query({ "country" : queryvalue
    //querykey , queryvalue
    //"country": "india"
  });
  req.headers({
    "x-rapidapi-host": "covid-193.p.rapidapi.com",
    "x-rapidapi-key": "36191329b7mshcbbefaca44e0129p11f24djsn5d13d22f2b25"
  });

  req.end( function (res) {
    if (res.error) throw new Error(res.error);

    //storedresp =  res.json();
    //storedresp = JSON.stringify(storedresp)
    //storedresp = JSON.parse(storedresp)
    console.log(res.body.response)
    //return storedresp;
    //return res.body.response;
  });

  return storedresp
}
 
function connecttodb()
{
var connection = mysql.createConnection({
  host     : '35.223.207.83',
  user     : 'root',
  password : 'npmgak@2020#'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log("Connected to DB!")
    //return connection;
  });

  connection.end();
}


module.exports = {
  EndPointSel,
  connecttodb
};




/*liveCO.query("CREATE DATABASE coviddb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });*/


  
    
//console.log('connected as id ' + connection.threadId);

// execution point

// function main()
// {

//   let response =  EndPointSel();

//   console.log(response);


//   let liveCO = connecttodb();

//   console.log(liveCO);

//   // how / should do i capture resp / connection object here?
//   //this is the best example to learn the async nature of JS 
//   // welcome to JS :) 
//   //liveCO.end();


// }
// main();