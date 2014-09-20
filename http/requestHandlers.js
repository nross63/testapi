var exec= require("child_process").exec;
var photos = require("./services/photos");
function start(response){
	console.log("Request handler for start called!");

	exec("ls -lah", function(error, stdout, stderr){
		response.writeHead(200,{
			"Content-Type":"text/pain"
		});
	response.write(stdout);
	response.end();
	});
}

function photos(response){
	
}

//Export public module functions
exports.start=start;