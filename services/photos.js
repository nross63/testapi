var restify = require('restify');
var mongojs = require("mongojs");


/* =============================================================================
    NOTE: Checkout branch 'mockPicPay/photos' before working in this file!
                    $ git checkout photos
// =============================================================================*/


//local connection string
var connStr = 'mongodb://localhost/mockapi';
//TODO remote connection string
//var connStr = 'mongodb://OUR_SERVER_IP_OR_HOST_NAME/mockapi';

// connect to our database and collection
var db = mongojs(connStr, ['photos']);

/*
 *  GET /photos/
 *  Query MongoDB for all photos
 *  @param req => request
 *  @param res => response
 *  @param next =>  TODO
 */
function findAll(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.photos.find().limit(20).sort({
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
 *  GET /photo?id={id}
 *  Query MongoDB for photo
 *  @param req => request
 *  @param res => response
 *  @param next =>  TODO
 */
function find(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.photos.findOne({
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
 *  POST /photo/
 *  Create a new photo from request data
 *  @param req => request
 *  @param res => response
 *  @param next =>  TODO
 */
function save(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var photo = req.body;
    console.log(photo)
    db.photos.save(photo,
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
 *  DELETE /photo?id={id}
 *  Delete a photo from MongoDB
 *  @param req => request
 *  @param res => response
 *  @param next =>  TODO
 */
function remove(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.photos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {
            res.send(204);
            return next();
        } else {
            return next(err);
        }
    })

};

exports.findAll = findAll;
exports.find = find;
exports.save = save;
exports.remove = remove;
