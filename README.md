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
	-[http://mcavage.me/node-restify/][restify]
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
	- Christopher Waddell
	- Jacob Reusser
	- Nate Ross
	- Patrick Weisz
	- Rosemarie McClamrock


[restify]: http://mcavage.me/node-restify/ "API Guide | restify"