#mockPicPay 
	Mock and test picturePay API

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
##TODO
Finish README doc

##RESTful JSON Server 
	-restify is a node.js module built specifically to enable you to build correct REST web services. 
[http://mcavage.me/node-restify/][restify]
###Service Template
	-Insert code similar to the following into index.js:
			
			var myRoute = require('./services/myRoute');
			//Configure myRoute routes & handlers  
			var myPATH = '/myRoute';
			server.get({path : myPATH , version : '0.0.1'} , myRoute.findAll);
			server.get({path : myPATH +'/:id' , version : '0.0.1'} , myRoute.find);
			server.post({path : myPATH , version: '0.0.1'} ,myRoute.save);
			server.del({path : myPATH +'/:id' , version: '0.0.1'} ,myRoute.remove);

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


[restify]: http://mcavage.me/node-restify/ "API Guide | restify"
[chris]: mailto:cwaddell.guru@gmail.com "Email Chris"
[jacob]: mailto:jreusser@logikos.com "Email Jacob"
[nate]: mailto:nate.ross@alliedpayment.com "Email Nate"
[patrick]: mailto:patrick.weisz@alliedpayment.com "Email Patrick"
[rose]: mailto:mcclr01@students.ipfw.edu"Email Rosemarie"