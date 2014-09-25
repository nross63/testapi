//Load restify using the require function and assign the module to a variable.
var restify = require('restify');
var bunyan = require('bunyan');

//restify services
var picture = require("./services/picture");

//TODO import new services here

//Server config 
var _ip = '127.0.0.1';
var _port = '8080';
var _name = "mock"

//Create logger
var log = bunyan.createLogger({
    name: _name
});

//API Version
var _version = "0.0.2";

//Create a new server using restify API
var server = restify.createServer({
    name: _name,
    version: _version
});
log.info('Created Server: ' + _name);
log.info({
    server: restify
});
//Plugin is used to parse the HTTP query string (i.e., /picture?id=1). 
//The parsed content will always be available in req.query.
server.use(restify.queryParser());

//Turns request data into a JavaScript object on the server automatically
server.use(restify.bodyParser());

//Configures CORS support in the application
server.use(restify.CORS());

//TODO: debug 405 & 500 errors.

//Configure picture routes & handlers 
picture.initialize(_name, _ip, _port);
var picPATH = '/picture'
server.get({
    path: picPATH,
    version: _version
}, picture.findAll);
server.get({
    path: picPATH + '/:id',
    version: _version
}, picture.find);
server.post({
    path: picPATH,
    version: _version
}, picture.save);
server.del({
    path: picPATH + '/:id',
    version: _version
}, picture.remove);

//TODO add more service routes & handlers



//start server
server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
