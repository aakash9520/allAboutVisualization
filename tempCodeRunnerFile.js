var unirest = require("unirest");

var req = unirest("GET", "https://covid-193.p.rapidapi.com/countries");

req.headers({
	"x-rapidapi-host": "covid-193.p.rapidapi.com",
	"x-rapidapi-key": "36191329b7mshcbbefaca44e0129p11f24djsn5d13d22f2b25"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
	console.log(res.body);
});