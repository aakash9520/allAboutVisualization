var unirest = require("unirest");
var mysql = require('mysql');

//endpoint values are countries, statistics , countries : as per rapidapi
function EndPointSel(endpoint = "statistics", queryvalue = "india") {
  const restep = "https://covid-193.p.rapidapi.com/" + endpoint;
  var req = unirest("GET", restep);

  var storedresp;

  // req.query({
  //   "country": queryvalue
  //   //querykey , queryvalue
  //   //"country": "india"
  // });
  req.headers({
    "x-rapidapi-host": "covid-193.p.rapidapi.com",
    "x-rapidapi-key": "36191329b7mshcbbefaca44e0129p11f24djsn5d13d22f2b25"
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log("after resolving!!!  ready to return")
    //storedresp = res
    connecttodb(res);
    //storedresp = JSON.stringify(storedresp)
    //storedresp = JSON.parse(storedresp)
    //console.log(res.body.response)
    //return storedresp;
    //return res.body.response;
  });

  //console.log(storedresp)
  //return storedresp
}

function main() {

  var dojo = EndPointSel();
  //console.log(dojo);

  //setTimeout(() => { "lets wait for dojo" }, 3000)

  //console.log(dojo);

}
main();

function connecttodb(res) {
  var connection = mysql.createConnection({
    host: '35.223.207.83',
    user: 'root',
    password: 'npmgak@2020#',
    database: "coviddb"
  });

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log("Connected to DB!")
    console.log(res.body.response)
    //return connection;
  });
  //CreateTable(connection);
  //InsertData(connection,res.body.response);
  updateData(connection,res.body.response);
  FetchData(connection); 
  connection.end();
}
function CreateTable(connection){
  var sql = "CREATE TABLE table1_covid_19 (id INT AUTO_INCREMENT PRIMARY KEY, name_Country VARCHAR(255), cases_new VARCHAR(10), cases_active int(20), cases_recovered int(20), cases_total int(20), deaths_new VARCHAR(10), deaths_total int (20))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
}
function FetchData(connection){
  var sql = "SELECT * from table1_covid_19";
  connection.query(sql,function(error,result,fields){
    console.log("select query result as follows! ");
    console.log(fields);
  })
}
function InsertData(connection,resp){
  var sql = "INSERT INTO table1_covid_19 (id,name_Country,cases_new,cases_active,cases_recovered,cases_total,deaths_new,deaths_total) VALUES ?";
  var values = [];
  var j = 0;
  for(i =1 ; i<resp.length;i++){
   
    if(resp[i].country != "ALL")
    {
      values[j] = [i, resp[i].country,resp[i].cases.new,resp[i].cases.active,resp[i].cases.recovered,resp[i].cases.total,resp[i].deaths.new,resp[i].deaths.total];
      j++;
    }
  }
  connection.query(sql , [values],  function (err, result) {
    if (err) 
    {
      console.log("error occured " + err.stack);
      //throw err;
    }
     
    console.log("Number of records inserted: " + result.affectedRows);
  });
//   console.log("Insert sucessful.");
// });

}
function updateData(connection,resp){
  var sql = "REPLACE INTO table1_covid_19 (name_Country,cases_new,cases_active,cases_recovered,cases_total,deaths_new,deaths_total) VALUES ?";
  var values = [];
  var j = 0;
  for(i =1 ; i<resp.length;i++){
   
    if(resp[i].country != "ALL")
    {
      values[j] = [resp[i].country,resp[i].cases.new,resp[i].cases.active,resp[i].cases.recovered,resp[i].cases.total,resp[i].deaths.new,resp[i].deaths.total];
      j++;
    }
  }
  connection.query(sql , [values],  function (err, result) {
    if (err) 
    {
      console.log("error occured " + err.stack);
      //throw err;
    }
     
    console.log("Number of records updated: " + result.affectedRows);
  });
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