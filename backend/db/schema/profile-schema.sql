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

CREATE TABLE company(
  company_id INT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT
);

CREATE TABLE employee (
  username TEXT NOT NULL,
  company_id INT NOT NULL,
  title TEXT, 
  FOREIGN KEY(username) REFERENCES aic_user
    on delete cascade, 
  FOREIGN KEY(company_id) REFERENCES company
    on delete cascade
);

-- Insert record for roles
INSERT INTO aic_role VALUES 
(1, 'Teacher'), 
(2, 'Entrepreneur'), 
(3, 'Partner');
