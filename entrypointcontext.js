
var mymodule = require('./testapi.js');

function main()
{

  let response =  mymodule.EndPointSel();

  console.log(response);


  let liveCO = mymodule.connecttodb();

  console.log(liveCO);

  // how / should do i capture resp / connection object here?
  //this is the best example to learn the async nature of JS 
  // welcome to JS :) 
  //liveCO.end();



}
main();