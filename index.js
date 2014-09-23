//Load the restify and mongojs modules using the require function and assign them to variables.
var restify = require('restify');

//restify services
var picture = require("./services/picture");

//Server config 
var ip_addr = '127.0.0.1';
var port    =  '8080';
var appName = "mock"




//Create a new server using restify API
var server = restify.createServer({name:appName});

//Plugin is used to parse the HTTP query string (i.e., /picture?id=1). 
//The parsed content will always be available in req.query.
server.use(restify.queryParser());

//Turns request data into a JavaScript object on the server automatically
server.use(restify.bodyParser());

//Configures CORS support in the application
server.use(restify.CORS());

//Configure picture routes & handlers  
var picPATH = '/picture'
server.get({path : picPATH , version : '0.0.1'} , picture.findAll);
server.get({path : picPATH +'/:id' , version : '0.0.1'} , picture.find);
server.post({path : picPATH , version: '0.0.1'} ,picture.save);
server.del({path : picPATH +'/:id' , version: '0.0.1'} ,picture.remove);


// //Configure myRoute routes & handlers  
// var myPATH = '/myRoute'
// server.get({path : myPATH , version : '0.0.1'} , myRoute.findAll);
// server.get({path : myPATH +'/:id' , version : '0.0.1'} , myRoute.find);
// server.post({path : myPATH , version: '0.0.1'} ,myRoute.save);
// server.del({path : myPATH +'/:id' , version: '0.0.1'} ,myRoute.remove);


//start server
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});