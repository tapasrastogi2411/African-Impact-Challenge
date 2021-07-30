# Sprint 2 Planning Meeting
### Project: African Impact Challenge: Community & E-learning

### Participants
  - Development Team
    - Brandon Jaipersaud
    - Aaron Tan
    - Clement Tran
    - Tapas Rastogi
    - Haolong Zhang
    - Ho Ki Yuen
    - Jules Patrick Kemzang
  - Product Owner
    - Efosa Obano

## Sprint 2 Goals
- Complete company profile creation user stories 
- Complete user stories pertaining to file/resource upload for the e-learning component of the site


## Sprint 2 User Stories and Tasks Breakdown


### [TT-66] As an entrepreneur, I want to create a company so that the state of my company is stored on the website which includes things like company members and resources. (20 pts)
Sub-Tasks
* [TT-67] Create a “create company” button which when clicked opens up a form dialog enabling the entrepreneur to create their company - Brandon Jaipersaud
* [TT-67] Create a “view company” button which when clicked takes the entrepreneur to their company page - Brandon Jaipersaud
* [TT-69] Create the company page - Brandon Jaipersaud
* [TT-73] Modify the database to store companies and the entrepreneurs who work for the company - Brandon Jaipersaud

### [TT-17] As a user, I want to view the profile of another user/entity so that I can gain more information about and interact with the user. (39 pts)
Sub-Tasks
* [TT-62] Create a “people” page which holds information about all the users and entities in the application (entrepreneurs, teachers, partners and companies created by the entrepreneurs)  – Haolong Zhang


### [TT-7] As a teacher, I want to post videos and readings for students to watch and complete in a self-paced manner so that they will be aided in the assignments and obtain valuable knowledge as entrepreneurs. (46 pts)
Sub-Tasks
* [TT-69] Store videos, readings and assignments in file-system on the server  – Aaron Tan
* [TT-71] Create route for obtaining videos, readings and assignments from the server – Tapas Rastogi
* [TT-70] Modify the db schema to include the posted resources – Ho Ki Yuen
* [TT-74] Create video page - Clement Tran
* [TT-76] Create readings page - Clement Tran

### [TT-9] As a teacher, I want to post assignments for students to complete by a specified due date so they can practice what they learned in the videos in a practical setting.  (46 pts)
Sub-Tasks
* [TT-72] Create route for uploading videos, readings and assignments onto the server – Patrick Kemzang
* [TT-65] Create a page to render the assignments on the frontend - Clement Tran

### [TT-77] As a user, I want to be greeted by a welcome page after I login so that my experience on the site is more enjoyable. (20 pts)
Sub-Tasks
* [TT-78] Create dashboard page which tells users what they can do on the site and how to go about navigating through the site. - Haolong Zhang


### Other Tasks and Bug Fixes

* [TT-59 and TT-60] Fix the form validation for registration and login forms. Apply backend validation so users cannot register if the username is taken and cannot login if their username/password is invalid. (8+8=16 pts) - Brandon Jaipersaud 
* [TT-61] Render appropriate fields on the profile page based on data stored in the database. (10 pts) - Brandon Jaipersaud



## Team Capacity
* Our group of 7 people plan to each dedicate 5 hours per day for 8 days (280 hours total) to complete 179 (sum of story points for the above stories) story points this sprint. Note that this velocity is higher than in sprint1.

## Spikes (User stories that are difficult to estimate)
* The stories involving uploading resources to the server are difficult to estimate since the team currently does not know how this can be done.
* Note that the spikes identified in sprint1 (estimating frontend tasks for user stories) has been removed since the team now has more experience on frontend design and can better estimate those stories. 






