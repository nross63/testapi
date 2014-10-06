var restify = require('restify');
var mongojs = require("mongojs");


/****************************************************************************
    NOTE: Checkout branch 'mockPicPay/picture' before working in this file!
                    $ git checkout picture
*****************************************************************************/

//MongoDB config
var connection_string = null;
var db = null;
var pics = null;


//logger
var log = null;

/*
 *  Initialize the picture RESTful endpoint
 *  @param name => type:String =  app name ? "mock"
 *  @param ip => type:String =  server ip address ?  "localhost"
 *  @param port =>  type:String =  server port ? "8080"
 *  @param logger =>  type: bunyan logger
 */
function init(name, ip, port, logger) {
    if (name === undefined || name === null || ip === undefined || ip === null || port === undefined || port === null || logger === undefined || logger === null) {
        return false;
    }
    _name = (name.length > 0) ? name : "mock";
    _ip = (ip.length > 0) ? ip : "localhost";
    _port = (port.length > 0) ? port : "8080";
    log = logger;
    console.log(log);
    connection_string = _ip + ":" + _port + "/" + _name;
    console.log(connection_string);
    db = mongojs(connection_string, [_name]);
    console.log(db);
    pics = db.collection(_name);
    console.log(pics);
    return true;
};

/*
 *  GET /photo/
 *  Query MongoDB for all photos
 *  @param req => type:TODO =  TODO
 *  @param res => type:TODO =  TODO
 *  @param next =>  type:TODO =  TODO
 */
function findAll(req, res, next) {
    console.log({req:req,res:res,next:next});
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(pics);
    pics.find().limit(20).sort({
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
 *  @param req => type:TODO =  TODO
 *  @param res => type:TODO =  TODO
 *  @param next =>  type:TODO =  TODO
 */
function find(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    pics.findOne({
        _id: mongojs.ObjectId(req.params.id)
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
 *  @param req => type:TODO =  TODO
 *  @param res => type:TODO =  TODO
 *  @param next =>  type:TODO =  TODO
 */
function save(req, res, next) {
    var pic = req.body;
    res.setHeader('Access-Control-Allow-Origin', '*');
    pics.save(pic, function(err, success) {
        console.log('Response success ' + success);
        console.log('Response error ' + err);
        if (success) {
            res.send(201, pic);
            return next();
        } else {
            return next(err);
        }
    });
};
/*
 *  DELETE /photo?id={id}
 *  Delete a photo from MongoDB
 *  @param req => type:TODO =  TODO
 *  @param res => type:TODO =  TODO
 *  @param next =>  type:TODO =  TODO
 */
function remove(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    pics.remove({
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

exports.init = init;
exports.findAll = findAll;
exports.find = find;
exports.save = save;
exports.remove = remove;
