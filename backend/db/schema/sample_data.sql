SET SEARCH_PATH to profile_schema,public;
INSERT INTO aic_role VALUES 
(1, 'Teacher'), 
(2, 'Entrepreneur'), 
(3, 'Partner');

INSERT INTO aic_user VALUES 
('Teacher_1', 'teacher', 1, 'Ms', 'Diana', 'Butler', 'diana@aci.com', null, 'Canada', null), 
('Entrepreneur_1', 'entrepreneur', 2, 'Mr', 'Sean', 'Wright', 'sean@gmail.com', '6471234567', 'Canada', '1265 Military Trail, Scarborough, ON'), 
('Partner_1', 'partner', 3, 'Mr', 'Fred', 'Milton', 'fred@company.com', '6471234567', 'Canada', '40 Bay St, Toronto, ON');


INSERT INTO message VALUES 
('Teacher_1', 'Entrepreneur_1', '2021-06-08 9:30:00', 'Remainder: Module 3 is due tomorrow night'), 
('Partner_1', 'Entrepreneur_1', '2021-06-08 15:30:00', 'Hello, I am interesting into your company'), 
('Entrepreneur_1', 'Partner_1', '2021-06-08 15:31:00', 'Hi');


INSERT INTO company VALUES 
(1, 'IOK Tech', null);

INSERT INTO employee VALUES 
('Entrepreneur_1', 1, 'Founder');



