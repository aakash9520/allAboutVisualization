// this code is not completed yet
var unirest = require("unirest");
var mysql   = require('mysql');
var resp = [];
//endpoint values are countries, statistics , countries : as per rapidapi
 function EndPointSel(endpoint="statistics",queryvalue="india")
{
  const restep = "https://covid-193.p.rapidapi.com/" + endpoint;
  var req = unirest("GET", restep);

  

  req.headers({
	"x-rapidapi-host": "covid-193.p.rapidapi.com",
	"x-rapidapi-key": "11a38c7123msh1ecec9cf26ca660p11fd7cjsn6c6b3864ca43"
});

  req.end( function (res) {
    if (res.error) throw new Error(res.error);

    //storedresp =  res.json();
    //storedresp = JSON.stringify(storedresp)
    //storedresp = JSON.parse(storedresp)
    resp =  res.body.response;
    console.log(res.body.results)
    console.log("hi aa")
    storedresp = JSON.stringify(res.body.results)
   for(i=1; i< storedresp ;i++)
   {
    console.log("hi aa")
    console.log("i is " + i)
    console.log(res.body.response[i].country)  // hello whatever
    console.log(res.body.response[i].cases.new)
    console.log(res.body.response[i].cases.active)
    console.log(res.body.response[i].cases.recovered)
    console.log(res.body.response[i].cases.total)
    console.log(res.body.response[i].deaths.new)
    console.log(res.body.response[i].deaths.total)

    // connection.connect((error) => {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         let query = 'INSERT INTO table1_covid_19 (name_Country, cases_new, cases_active,cases_recovered,cases_total,deaths_new, deaths_total) VALUES (?, ?, ?, ?, ?, ?, ?);';
    //         let params = [res.body.response[i].country.stringify, 
    //         res.body.response[i].cases.new.stringify, 
    //         res.body.response[i].cases.active.stringify,
    //         res.body.response[i].cases.recovered.stringify,
    //         res.body.response[i].cases.total.stringify,
    //         res.body.response[i].deaths.new.stringify,
    //         res.body.response[i].deaths.total.stringify
    //     ];
    //         connection.query(query, params, (error, result) => {
    //             //inserted row -> 1
    //         });
    //     }
    // });


   }
    //return storedresp;
    //return res.body.response;
  });

  //return storedresp
}
 
function connecttodb()
{
var connection = mysql.createConnection({
  host     : '35.223.207.83',
  user     : 'root',
  password : 'npmgak@2020#',
  database: "coviddb"
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log("Connected to DB!")
    return connection;
  });

  //CreateTable(connection);
   InsertData(connection);
  connection.end();
}
function CreateTable(connection){
  var sql = "CREATE TABLE table1_covid_19 (id INT AUTO_INCREMENT PRIMARY KEY, name_Country VARCHAR(255), cases_new VARCHAR(10), cases_active int(20), cases_recovered int(20), cases_total int(20), deaths_new VARCHAR(10), deaths_total int (20))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
}
function InsertData(connection){
  var sql = "INSERT INTO table1_covid_19 (id,name_Country,cases_new,cases_active,cases_recovered,cases_total,deaths_new,deaths_total) VALUES ?";
  var values = [];
  for(i =1 ; i<resp.length;i++){
    values.push(i, resp[i].Country,resp[i].cases.new,resp[i].cases.active,resp[i].cases.recovered,resp[i].cases.total,resp[i].deaths.new,resp[i].deaths.toatl);  
  }
  connection.query(sql , [values], function(error){if (error) throw error;
  console.log("Insert sucessful.");
});

}





/*liveCO.query("CREATE DATABASE coviddb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });*/


  
    
//console.log('connected as id ' + connection.threadId);

// execution point

function main()
{

 let response =  EndPointSel();

  console.log(response);


  let liveCO = connecttodb();

  console.log(liveCO);

  // how / should do i capture resp / connection object here?
  //this is the best example to learn the async nature of JS 
  // welcome to JS :) 
  //liveCO.end();



}
main();
    
  
  
      //console.log(response.response[i].country);  // hello whatever
      //console.log(response.response[i].deaths.total);
      //console.log(response.response[i].deaths.total);
    //}

  