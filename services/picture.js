var restify = require('restify');
var mongojs = require("mongojs");

var appName = "";

//MongoDB config
var connection_string = ip_addr + ":"+port+"/"+appName;
var db = mongojs(connection_string, [appName]);
var pics = db.collection("pictures");

//accept app name as parameter or default to "mock"
function initialize(name){
	if(name !== undefined && name !== null){
		appName = (name.length > 0) ? name : "mock";	
	}
	
};

function findAll(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    pics.find().limit(20).sort({postedOn : -1} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }
 
    });
};
 
function find(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    pics.findOne({_id:mongojs.ObjectId(req.params.jobId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
};
 
function save(req , res , next){
    var job = {};
    job.title = req.params.title;
    job.description = req.params.description;
    job.location = req.params.location;
    job.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    pics.save(job , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , job);
            return next();
        }else{
            return next(err);
        }
    });
};
 
function remove(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    pics.remove({_id:mongojs.ObjectId(req.params.jobId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();      
        } else{
            return next(err);
        }
    })
 
};

exports.initialize = initialize;
exports.findAll = findAll;
exports.find = find;
exports.save = save;
exports.remove = remove;