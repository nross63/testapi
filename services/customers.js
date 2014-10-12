var restify = require('restify');
var mongojs = require("mongojs");

//local connection string
var connStr = 'mongodb://localhost/mockapi';
//TODO remote connection string
//var connStr = 'mongodb://OUR_SERVER_IP_OR_HOST_NAME/mockapi';

// connect to our database and collections
var db = mongojs(connStr, ['templates','customers']);

/*
 *  GET /customers/
 *  Query MongoDB for all customers
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function findAll(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.customers.find().limit(20).sort({
        id: 1
    }, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {
            res.send(200, success);
            return next();
        } else {
            return next(err);
        }

    });
};

/*
 *  GET /customers/{id}
 *  Query MongoDB for customer
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function find(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.customers.findOne({
        id: req.params.id
    }, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {
            res.send(200, success);
            return next();
        }
        return next(err);
    })
};

/*
 *  GET /customers/{id}/templates
 *  Query MongoDB for specific customer's templates
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function findTemplates(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.templates.find({customerId: req.params.id}).limit(20).sort({
		id: 1
    }, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {
            res.send(200, success);
            return next();
        } else {
            return next(err);
        }

    });
}

/*
 *  GET /customers/{id}/templates/{template}
 *  Query MongoDB for specific customer's specific template
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function findTemplate(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.templates.findOne({
        customerId: req.params.id,
		id: req.params.template 
		}, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {
            res.send(200, success);
            return next();
        }
        return next(err);
    }
	)
}

/*
 *  POST /customers/create
 *  Post new customer from request data
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function save(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var customer = req.body;
    console.log(customer)
    db.customers.save(customer,
        function(err, data) {
            if (err) {
                console.log('An error has occured for POST /customers/create');
                console.log(err);
            }
            if (data) {
                console.log('DATA: ');
                console.log(data);
            }
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
};

/*
 *  POST /customers/{id}/templates
 *  Post new template from request data
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function saveTemplate(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var template = req.body;
    console.log(template)
    db.templates.save(template,
        function(err, data) {
            if (err) {
                console.log('An error has occured for POST /customers/{id}/templates');
                console.log(err);
            }
            if (data) {
                console.log('DATA: ');
                console.log(data);
            }
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
};

/*
 *  PUT /customers/{id}
 *  Modify customer from request data
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function put(req, res, next) {
    // get the existing customer
    db.customers.findOne({
        id: req.params.id
    }, function (err, data) {
        // merge req.params/customer with the server/customer
 
        var updProd = {}; // updated customers 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.customers.update({
            id: req.params.id
        }, updProd, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
};

/*
 *  PUT /customers/{id}/templates/{template}
 *  Modify customer from request data
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function putTemplate(req, res, next) {
    // get the existing template
    db.templates.findOne({
        customerId: req.params.id,
		id: req.params.template
    }, function (err, data) {
        // merge req.params/template with the server/template
 
        var updProd = {}; // updated templates 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.templates.update({
            customerId: req.params.id,
			id: req.params.template
        }, updProd, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
};

/*
 *  PATCH /customers/{id}
 *  Modify customer from request data
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function patch(req, res, next) {
    // get the existing customer
    db.customers.findOne({
        id: req.params.id
    }, function (err, data) {
        // merge req.params/customer with the server/customer
 
        var updProd = {}; // updated customers 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.customers.update({
            id: req.params.id
        }, updProd, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
};

/*
 *  PATCH /customers/{id}/templates/{template}
 *  Modify template from request data
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function patchTemplate(req, res, next) {
    // get the existing template
    db.templates.findOne({
        customerId: req.params.id,
		id: req.params.template
    }, function (err, data) {
        // merge req.params/template with the server/template
 
        var updProd = {}; // updated templates 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.templates.update({
            customerId: req.params.id,
			id: req.params.template
        }, updProd, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
};
/*
 *  DELETE /customer/{id}/templates/{id}
 *  Delete a customer template from MongoDB
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function removeTemplate(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.templates.remove({
		customerId: req.params.id,
        id: req.params.template
    }, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {
            res.send(200);
            return next();
        } else {
            return next(err);
        }
    })

};

exports.findAll = findAll;
exports.find = find;
exports.put = put;
exports.patch = patch;
exports.save = save;
exports.findTemplates = findTemplates;
exports.findTemplate = findTemplate;
exports.putTemplate = putTemplate;
exports.patchTemplate = patchTemplate;
exports.saveTemplate = saveTemplate;
exports.removeTemplate = removeTemplate;