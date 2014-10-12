//Load restify using the require function and assign the module to a variable.
var restify = require('restify');
var mongojs = require("mongojs");
//restify services
var photos = require("./services/photos");
var customers = require("./services/customers");



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
    var photosPath = '/photos'

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


// CUSTOMERS
// =============================================================================
    var customersPath = '/customers'
    // GET all customers
	server.get({
        path: customersPath
    }, customers.findAll);

    // GET specific customer
    server.get({
        path: customersPath + '/:id'
    }, customers.find);
	    // POST create new customer
    server.post({
        path: customersPath + '/create'
    }, customers.save);
	// POST create new template
    server.post({
        path: customersPath + '/:id'+'/templates'
    }, customers.saveTemplate);
	
	// GET a specific customer's templates
    server.get({
        path: customersPath + '/:id'+ '/templates'
    }, customers.findTemplates);
	
	// GET a specific customer's specific template
    server.get({
        path: customersPath + '/:id'+ '/templates'+ '/:template'
    }, customers.findTemplate);
	
	//PATCH update a customer
	server.patch({
        path: customersPath + '/:id'
    }, customers.patch);
	
	   //PUT update a customer
	   server.put({
        path: customersPath + '/:id'
    }, customers.put);
		//PUT update a template
	   server.put({
        path: customersPath + '/:id'+ '/templates'+ '/:template'
    }, customers.putTemplate);
		//PATCH update a template
	   server.patch({
        path: customersPath + '/:id'+ '/templates'+ '/:template'
    }, customers.patchTemplate);
	
	//DELETE remove a template
	   server.del({
        path: customersPath + '/:id'+ '/templates'+ '/:template'
    }, customers.removeTemplate);
	
//TODO add more service routes & handlers
// =============================================================================



//start server
server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
