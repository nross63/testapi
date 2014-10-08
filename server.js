//Load restify using the require function and assign the module to a variable.
var restify = require('restify');
var mongojs = require("mongojs");
//restify services
var photos = require("./services/photos");
var payments = require("./services/payments");


//TODO import new services here

//Server config
var _ip = '127.0.0.1';
var _port = '8080';
var _name = "mockapi"

//API Version
var _version = "0.0.2";

//Create a new server using restify API
var server = restify.createServer({
    name: _name,
    version: _version
});

//Plugin is used to parse the HTTP query string (i.e., /photo/:id).
//The parsed content will always be available in req.query.
server.use(restify.queryParser());

//Turns request data into a JavaScript object on the server automatically
server.use(restify.bodyParser());

//Configures CORS support in the application
server.use(restify.CORS());

server.get({
    path: '/'
}, function(req, res, next) {
    res.send('hello world');
    next();
});

// PHOTOS
// =============================================================================
    var photosPath = '/photos';

    // GET all photos
    server.get({
        path: photosPath
    }, photos.findAll);

    // GET specific photo
    server.get({
        path: photosPath + '/:id'
    }, photos.find);
    

    // POST create new photo
    server.post({
        path: photosPath
    }, photos.save);
    

    // DELETE remove photo
    server.del({
        path: photosPath + '/:id'
    }, photos.remove);




// PAYMENTS
// =============================================================================

	var paymentsPath = '/payments';
	
	// GET all payments
	server.get({
		path: paymentsPath
	}, payments.findAll);
	
	// GET a specific payment
	server.get({
		path: paymentsPath + '/:id'
	}, payments.find);
	
	// POST create a new payment
	server.post({
		path: paymentsPath
	}, payments.save);
	
	// PUT update a specific payment
	server.put({
		path: paymentsPath + '/:id'
	}, payments.change);
	
//start server
server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
