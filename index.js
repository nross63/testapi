var server=require("./http/server");
var router=require("./http/router");
var requestHandlers = require("./http/requestHandlers");

var handle={};
handle["/"]= requestHandlers.start;
handle["/start"]=requestHandlers.start;
server.start(router.route, handle);