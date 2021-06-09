-- Profile Schema
DROP SCHEMA IF EXISTS profile_schema CASCADE;
CREATE SCHEMA profile_schema;
SET SEARCH_PATH to profile_schema,public;

CREATE TABLE aic_role (
  role_id INT PRIMARY KEY,
  role_name VARCHAR(20) NOT NULL
);

CREATE TABLE aic_user (
  user_id INT PRIMARY KEY,
  password TEXT NOT NULL,
  username VARCHAR(20) NOT NULL,
  user_role INT NOT NULL,
  honorifics VARCHAR(5),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone_number INT,
  country VARCHAR(20),
  address TEXT,
  FOREIGN KEY(user_role) REFERENCES aic_role
);


CREATE TABLE message (
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  time timestamp NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY(sender_id) REFERENCES aic_user, 
  FOREIGN KEY(receiver_id) REFERENCES aic_user
);

CREATE TABLE company(
  company_id INT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT
);

CREATE TABLE employee (
  user_id INT NOT NULL,
  company_id INT NOT NULL,
  title TEXT, 
  FOREIGN KEY(user_id) REFERENCES aic_user, 
  FOREIGN KEY(company_id) REFERENCES company
);



