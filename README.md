#mockPicPay 
	Mock and test picturePay API
##TODO
        -Finish README doc
	        - Add testing info 
	        - Edit & Revise
        -Implement tests for services
        -Implement REST API services

##Requirements
[node.js][node]

##Installation
			$ cd ~/desired/path/
			$ git clone https://nross63@bitbucket.org/nross63/mockpicpay.git
			$ npm install
##Usage
#####Navigate to your project directory
		$ cd ~/.../mockpicpay/
#####Start restify server
		$ node server.js

######About restify
	-restify is a node.js module built specifically to enable you to build correct REST web services. 
[http://mcavage.me/node-restify/][restify]

	-A great tutorial on how to create RESTful API's with node, restify, and MongoDB
[The Jackal of Javascript][tutorial]

##How To Contribute
###Add RESTful endpoints
	-Add service endpoints by following the template below.
####Service Template
		-Insert code similar to the following into mock.js:
			
			var myRoute = require('./services/myRoute');
			//Configure myRoute routes & handlers  
			var myPATH = '/myRoute';

			    // GET all resources at path
			    server.get({
			        path: myPATH
			    }, myRoute.findAll);

			    // GET specific photo
			    server.get({
			        path: myPATH + '/:id'
			    }, myRoute.find);
			    

			    // POST create new photo
			    server.post({
			        path: myPATH
			    }, myRoute.save);
			    

			    // DELETE remove photo
			    server.del({
			        path: myPATH + '/:id'
			    }, myRoute.remove);

##How To Test Contributions
	- Create a restify client to consume your routes
		- See tests/photo.js for an working example.

##Basic GIT tips
	- List all changes staged & not staged
		git status
	- Stage all pending changes
		git add .
	- Commit staged changes 
		git commit -m 'insert commit message here'
	- See log of past commits
		git log
	- Create a branch and checkout the new branch
		git checkout -b branchName
	- Delete a branch (cannot delete the branch that is checked out)
		git branch -D branchName
	- Stage and commit all pending changes
		git commit -a -m 'insert commit message here'
	- Push current branch's changes to remote repo aka Bitbucket 
		git push
			Note: Use git add remote origin to configure the remote URL for push.

###Best Practices
- **DO NOT WORK DIRECTLY IN MASTER**
- Commit messages should be **present** tense.
- Example: git commit -m 'Update README with git tips.'

##Contributors 
 
####Christopher Waddell
[cwaddell.guru@gmail.com][chris] 

####Jacob Reusser
[jreusser@logikos.com][jacob]

####Nate Ross
[nate.ross@alliedpayment.com][nate]

####Patrick Weisz
[patrick.weisz@alliedpayment.com][patrick]

####Rosemarie McClamrock
[mcclr01@students.ipfw.edu][rose]

[node]: http://nodejs.org/ "Download node.js"
[restify]: http://mcavage.me/node-restify/ "API Guide | restify"
[tutorial]: http://thejackalofjavascript.com/nodejs-restify-mongolab-build-rest-api/ "Tutorial"
[chris]: mailto:cwaddell.guru@gmail.com "Email Chris"
[jacob]: mailto:jreusser@logikos.com "Email Jacob"
[nate]: mailto:nate.ross@alliedpayment.com "Email Nate"
[patrick]: mailto:patrick.weisz@alliedpayment.com "Email Patrick"
[rose]: mailto:mcclr01@students.ipfw.edu"Email Rosemarie"