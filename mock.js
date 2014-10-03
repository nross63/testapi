//Load restify using the require function and assign the module to a variable.
var restify = require('restify');
var bunyan = require('bunyan');

//restify services
var photo = require("./services/photo");

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

server.get({path: '/'}, function(req , res , next){
  res.send('hello world');
  next();
});

//Configure picture routes & handlers
photo.initialize(_name, _ip, _port,log);
var picPATH = '/photo'
//photo service routes
server.get({path: picPATH}, photo.findAll);
server.get({path: picPATH + '/:id'}, photo.find);
server.post({path: picPATH}, photo.save);
server.del({path: picPATH + '/:id'}, photo.remove);

//TODO add more service routes & handlers

//start server
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
