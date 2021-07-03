## Motivation
The aim of our project is to construct a community and e-learning platform to be used by young, aspiring African entrepreneurs partaking in the African Impact Challenge. This platform will allow them to undergo educational training and attend workshops that will aid them in their journey as entrepreneurs. Furthermore, this platform will allow for users to easily collaborate and network through various mediums such as a discussion board and direct messaging. An important reason for this is to faciliate communication between entrepreneurs and potential partners that may want to partner with their startup. Another crucial reason for this is so that the entrepreneurs can easily ask questions and form discussions about the educational content they consume.

More information about the African Impact Challenge can be found here: https://www.africanimpact.ca/the-african-impact-challenge



## Installation

### Technologies Used
- For our project we’ve decided to use the “PERN” stack; which stands for:
    - Postgresql
    - Express.js
    - React
    - Node.js
  
- Other technologies used are:
    - material-ui
    - Typescript 

### Build Instructions
To build and run the project do the following:

First, check if Postgresql is installed on your system by running:

	$ psql -V

If it is not installed, follow the directions in the postgresql website at https://www.postgresql.org/download/ to install it on your desired OS.

Next, you need to install npm (Node package manager) and Node.js. First, check if they are already installed by running:

	$ node -v
	$ npm -v

If Node.js is not installed, navigate to this website: https://nodejs.dev/learn/how-to-install-nodejs for installation instructions. Note that if you are using Mac OS and have homebrew installed as a package manager you can simply install Node.js by doing:

	$ brew install node

Installing Node.js automatically installs npm so you don't need to worry about installing it separately!

Now, to actually build the project first start by cloning  the repo and navigate to the top-level directory:

	$ git clone https://github.com/UTSCCSCC01/ResilientDevs/
	$ cd ResilientDevs/
	
To run the front-end do: 

	$ cd frontend
	$ npm install
	$ npm start

To run the back-end do:

	$ cd backend
	$ npm install
	$ node app.js
	

To initialize the Postgresql database do:

	$ First, create a database in Postgresql with databaseName=aic, username=postgres, password=postgres
	$ cd backend/db/schema/
	$ psql -d aic -f AIC.ddl


	

## Contribution Process 

- The contribution process is dependent on the concept of git flow and git branches. 
The repository consists of two main branches: "main" and "develop". 
The main branch is updated at the end of each sprint whereas the develop branch is updated after each feature is implemented. 
The contribution process is as follows:
	1) Create a new branch from "develop" and name it as "name_of_the_feature #[the user story number corresponding to the feature]"
	2) After the feature is implemented after passing all the test cases, a pull request into "develop" is created. 
	3) One of our group members will be responsible to review the code and accept the pull request. If a conflict occurs, the code reviewer and members involved in the conflict will communicate to resolve the issue.
	4) At the end of the sprint, "main" branch will pull from "develop"
	

## Project Notes

So far, the frontend of the project displays nicely for wide monitors (not laptops or mobile phones). In future development we will make this more flexible.




