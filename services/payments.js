var restify = require('restify');
var mongojs = require("mongojs");


/* =============================================================================
    NOTE: Checkout branch 'mockPicPay/payments' before working in this file!
                    $ git checkout payments
// =============================================================================*/


//local connection string
var connStr = 'mongodb://localhost/mockapi';
//TODO remote connection string
//var connStr = 'mongodb://OUR_SERVER_IP_OR_HOST_NAME/mockapi';

// connect to our database and collection
var db = mongojs(connStr, ['payments']);

/*
 *  GET /payments/
 *  Query MongoDB for all payments
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function findAll(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.payments.find().limit(20).sort({
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
 *  GET /payments?id={id}
 *  Query MongoDB for payment
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function find(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.payments.findOne({
        id: req.params.id
    }, function(err, data) {
        console.log('Response success ' + data);
        console.log('Response error ' + err);
        if (data) {
            console.log('data', data);
			res.send(200, data);
            return next();
        }
        return next(err);
    })
};
/*
 *  POST /payment/
 *  Create a new payment from request data
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function save(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var payment = req.body;
    console.log(payment);
    db.payments.save(payment,
        function(err, data) {
            if (err) {
                console.log('An error has occured for POST /payments');
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
 *  PUT /payment?id={id}
 *  update a payment in MongoDB
 *  @param req => request
 *  @param res => response
 *  @param next => passes control to the next matching route
 */
function change(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	
	db.payments.update(
	{// query
        id: req.params.id.toString()
    }, 
	req.body,
	function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
		
        if (success) {
            res.send(200, 'update successful');
		    return next();
        } else {
            return next(err);
        }
    });

};

exports.findAll = findAll;
exports.find = find;
exports.save = save;
exports.change = change;
