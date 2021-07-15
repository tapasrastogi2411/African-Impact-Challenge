--DROP DATABASE IF EXISTS aic;
--CREATE DATABASE aic;
--CONNECT TO "aic" AS USER postgres IDENTIFIED BY "connectpw";

-- Profile Schema
DROP SCHEMA IF EXISTS profile_schema CASCADE;
CREATE SCHEMA profile_schema;
SET SEARCH_PATH to profile_schema,public;

CREATE TABLE aic_role (
  role_id INT PRIMARY KEY,
  role_name VARCHAR(20) NOT NULL
);

CREATE TABLE aic_user (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  user_role INT NOT NULL,
  honorifics VARCHAR(5),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,  
  phone_number TEXT,
  country VARCHAR(20),
  address TEXT,
  FOREIGN KEY(user_role) REFERENCES aic_role
    on delete cascade
);


CREATE TABLE message (
  sender TEXT NOT NULL,
  receiver TEXT NOT NULL,
  time timestamp NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY(sender) REFERENCES aic_user
    on delete cascade, 
  FOREIGN KEY(receiver) REFERENCES aic_user
    on delete cascade
);
-- avoid enumerated types
-- consider whether domain is final or not
CREATE TABLE company(
  company_name TEXT PRIMARY KEY, -- each company must have a unique name
  address TEXT,
  industry VARCHAR(20) NOT NULL,
  size VARCHAR(20),
  bio VARCHAR(100),
  creator TEXT, -- should also be unique in our app
  FOREIGN KEY (creator) REFERENCES aic_user(username)
);

CREATE TABLE works_for(
  username TEXT PRIMARY KEY, -- a user can work for only one company
  company_name TEXT,
  FOREIGN KEY(username) references aic_user,
  FOREIGN KEY(company_name) references company
);


CREATE TABLE employee (
  username TEXT NOT NULL,
  company_name TEXT NOT NULL,
  title TEXT, 
  FOREIGN KEY(username) REFERENCES aic_user
    on delete cascade, 
  FOREIGN KEY(company_name) REFERENCES company
    on delete cascade
);

-- Insert record for roles
INSERT INTO aic_role VALUES 
(1, 'Teacher'), 
(2, 'Entrepreneur'), 
(3, 'Partner');


-- Post Schema
DROP SCHEMA IF EXISTS post_schema CASCADE;
CREATE SCHEMA post_schema;
SET SEARCH_PATH to post_schema;

CREATE TABLE PostCategory(
  category_id INT PRIMARY KEY, 
  category_name TEXT NOT NULL
);

CREATE TABLE PostFile (
  file_path TEXT PRIMARY KEY,
  category INT,
  upload_date timestamp NOT NULL, 
  upload_user TEXT not NULL, 
  title TEXT,
  description TEXT, 

  FOREIGN KEY(category) REFERENCES PostCategory
    on delete restrict
);


CREATE TABLE PostAssignment (
  file_path TEXT PRIMARY KEY,
  total_marks INT, -- Only applies to assignments (i.e. category=x). Should be optional. Ex. essay submission may not have total marks.
  deadline timestamp,

  FOREIGN KEY(file_path) REFERENCES PostFile(file_path)
    on delete cascade
);


--  Assignment submissions

-- maybe include grade and feedback here
CREATE TABLE SubmitAssignment (

  submission_file_path TEXT PRIMARY KEY, -- each user assignment submission is unique
  submission_user TEXT,
  assignment_file_path TEXT,
  submission_date timestamp, 
  grade INT,
  feedback TEXT,

  -- user can only submit 1 file per assignment
  UNIQUE(submission_user, assignment_file_path), 
  FOREIGN KEY(submission_user) REFERENCES profile_schema.aic_user(username)
    on delete restrict,
  FOREIGN KEY(submission_file_path) REFERENCES PostFile(file_path)
    on delete cascade,
  FOREIGN KEY(assignment_file_path) REFERENCES PostAssignment(file_path)
    on delete restrict

);

CREATE TABLE GradeAssignment (
  submission_file_path TEXT PRIMARY KEY, 
  grade INT,
  feedback TEXT,
  
  FOREIGN KEY(submission_file_path) REFERENCES SubmitAssignment
    on delete restrict
);






INSERT INTO PostCategory VALUES 
(1, 'Reading'), 
(2, 'Video'), 
(3, 'Assignment');


INSERT INTO profile_schema.aic_user VALUES
('Aaron', '12345678', 2, null, 'Aaron', 'Jacob'), 
('Karen', '12345678', 1, null, 'Karen', 'Reid'); 
