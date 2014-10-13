var restify = require('restify');
var mongojs = require("mongojs");


/* =============================================================================
    NOTE: Checkout branch 'mockPicPay/customers/templates' before working in this file!
                    $ git checkout templates
// =============================================================================*/


//local connection string
var connStr = 'mongodb://localhost/mockapi';
//TODO remote connection string
//var connStr = 'mongodb://OUR_SERVER_IP_OR_HOST_NAME/mockapi';

// connect to our database and collection
var db = mongojs(connStr, ['customers']);

/*
 *  GET /customers?id={custID}/template
 *  Query MongoDB for all customers
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function findAll(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	db.customers.findOne({
		custID: req.params.custID
	}, function(err, success) {
		console.log('Response success ' + success);
		console.log('Response error ' + err);
		if (success) {
			db.customers.templates.find().limit(20).sort({//check if right
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
			return next(err);
	})
};

/*
 *  GET /customer?id={custID}/template?id={tmptID}
 *  Query MongoDB for customer
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function find(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.customers.findOne({//Go into Customers
        custID: req.params.custID
    }, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {//if found go into Templates
                db.templates.findOne({//unsure if accurate? could be db.customers.templates.findOne
			tmptID: req.params.tmptID
		}, function(err, success) {
			console.log('Response success ' + success);
			console.log('Response error ' + err);
			if (success) {//YAY
				res.send(200, success);
				return next();
			}
		return next();
        }
        return next(err);
    })
};
/*
 *  POST /customer/template
 *  Create a new photo from request data
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function save(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var photo = req.body;
    console.log(photo)
    db.customers.templates.save(templates,//double check if right
        function(err, data) {
            if (err) {
                console.log('An error has occured for POST /photos');
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
 *  DELETE /customer?id={custID}/template?id={tmptID}
 *  Delete a photo from MongoDB
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function remove(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.customers.remove({
        _custID: mongojs.ObjectId(req.params.custID)
    }, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {
		db.templates.remove({
			_tmptID: mongojs.ObjectId(req.params.tmptID)
		}, function(err, success) {
			console.log('Response success ' + success);
			console.log('Response error ' + err);
			if (success) {
				res.send(204);
				return next();
			} else {
				return next(err);
		}
        } else {
            return next(err);
        }
    })

};

exports.findAll = findAll;
exports.find = find;
exports.save = save;
exports.remove = remove;