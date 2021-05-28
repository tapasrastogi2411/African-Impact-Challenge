Motivation:
- The aim of our project is to construct a community and e-learning platform where young entrepreneurs can undergo training, partake in seminars and conferences, as well as access several resources dedicated to their personal growth as well as that of their enterprise. Additionally, the platform should allow for collaboration and networking among users (hence the community aspect).

Installation:
- For our project we’ve decided to use the “PERN” stack; which essentially stands for:
    - Postgresql
    - Express.js
    - React
    - Node.js

The installation instructions for each go as follows:
- Postgresql (latest version - 13 for both Windows and MacOS):
    - For detailed instructions, download directly from the postgresql website at: https://www.postgresql.org/download/
- Express.js:
    - Can be installed directly through the command line through npm, detailed instructions here: https://expressjs.com/en/starter/installing.html
- React:
    - In order to install React, you will need to install a package manager. ‘npm’ (mentioned above) is a great package manager for javascript software. ‘Npm’ is automatically installed with Node.js, so follow the download link below.
Once npm installed, installing react is as simple as:
‘npm install --save react’
More detailed steps here: https://www.codecademy.com/articles/react-setup-i 
- Node.js:
    - Download here: https://nodejs.org/en/


Contribution Process: 

- The contribution process is dependent on the concept of git flow and git branches. 
The repository consists of two main branches: "master" and "develop". 
The master branch is updated at the end of each sprint whereas the develop branch is updated after each feature is implemented. 
The contribution process is as follows:
	1) Create a new branch from "develop" and name it as "name_of_the_feature #[the user story number corresponding to the feature]"
	2) After the feature is implemented after passing all the test cases, a pull request into "develop" is created. 
	3) One of our group members will be responsible to review the code and accept the pull request. If a conflict occurs, the code reviewer and members involved in the conflict will communicate to resolve the issue.
	4) At the end of the sprint, "master" branch will pull from "develop"




