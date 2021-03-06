DROP TABLE IF EXISTS ReportPost; 
DROP TABLE IF EXISTS Post; 
DROP TABLE IF EXISTS UserAccount;


CREATE TABLE UserAccount(
	Id INT NOT NULL AUTO_INCREMENT, 
    passwords VARCHAR(20) NOT NULL, 
    fname VARCHAR(20) NOT NULL, 
    lname VARCHAR(20) NOT NULL, 
    picture VARCHAR(255) NOT NULL, 
    age INT NOT NULL, 
    phone VARCHAR(12) NOT NULL, 
	email VARCHAR(50) NOT NULL, 
    PRIMARY KEY (Id),
    UNIQUE KEY (phone, email)
)ENGINE=Innodb;


CREATE TABLE Post(
	Id INT NOT NULL AUTO_INCREMENT, 
    userId INT NOT NULL,
    title VARCHAR(55) NOT NULL, 
    dateOfPost DATE NOT NULL, 
    dateRequesting DATE NOT NULL, 
	timeRequesting TIME NOT NULL, 
    message VARCHAR(1000) NOT NULL, 
    pets INT NOT NULL,
    offerType VARCHAR(15) NOT NULL, 
    space INT NOT NULL, 
    city VARCHAR(39) NOT NULL, 
    street VARCHAR(30) NOT NULL,
    state  VARCHAR(30) NOT NULL, 
	zip INT NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (userId) REFERENCES UserAccount (Id) ON DELETE CASCADE
)ENGINE=Innodb; 

 CREATE TABLE ReportPost(
	Id INT NOT NULL AUTO_INCREMENT, 
    userId INT NOT NULL, 
    postId INT NOT NULL, 
    whyReported VARCHAR(500), 
    dateOfRep DATE, 
	PRIMARY KEY (Id), 
	FOREIGN KEY (userId) REFERENCES UserAccount (Id) ON DELETE CASCADE, 
	FOREIGN KEY (postId) REFERENCES Post (Id) ON DELETE CASCADE
)ENGINE=Innodb;



/*test variables */
INSERT INTO UserAccount(passwords, fname, lname, picture, age, phone, email) VALUES ("pass", "stephen", "waller", "test.com", 50, "555-555-5555", "osucs361group25@gmail.com");
INSERT INTO Post (UserId, title, dateOfPost, dateRequesting, timeRequesting, message, pets, offerType, space, city, street, state, zip) VALUES (
	1, "NEED HELP", NOW(), NOW(), NOW(), "I AM HERE TO HELP ANYONE WHO NEEDS IT", 2,  "ride", 4, "Boise", "7550  ave", "id", 8814);
    
INSERT INTO UserAccount(passwords, fname, lname, picture, age, phone, email) VALUES ("pass", "Luke", "blanchlu", "test2.com", 50, "455-555-5555", "osucs361group25@gmail.com");
INSERT INTO Post (UserId, title, dateOfPost, dateRequesting, timeRequesting, message, pets, offerType, space, city, street, state, zip) VALUES (
	2, "NEED HELP", NOW(), NOW(), NOW(), "I AM HERE TO HELP ANYONE WHO NEEDS IT", 0,  "ride", 4, "Boise", "70  ave", "id", 8814);
    
INSERT INTO UserAccount(passwords, fname, lname, picture, age, phone, email) VALUES ("pass", "Josh", "Kinzel", "test3.com", 50, "355-555-5555", "osucs361group25@gmail.com");
INSERT INTO Post (UserId, title, dateOfPost, dateRequesting, timeRequesting, message, pets, offerType, space, city, street, state, zip) VALUES (
	3, "NEED HELP", NOW(), NOW(), NOW(), "I AM HERE TO HELP ANYONE WHO NEEDS IT", 9,  "ride", 4, "Boise", "90  ave", "id", 8814);
    
INSERT INTO UserAccount(passwords, fname, lname, picture, age, phone, email) VALUES ("pass", "Brett", "Hoelscher", "test4.com", 50, "255-555-5555", "osucs361group25@gmail.com");
INSERT INTO Post (UserId, title, dateOfPost, dateRequesting, timeRequesting, message, pets, offerType, space, city, street, state, zip) VALUES (
	4, "NEED HELP", NOW(), NOW(), NOW(), "I AM HERE TO HELP ANYONE WHO NEEDS IT", 5,  "ride", 4, "Boise", "7  ave", "id", 8814);


INSERT INTO ReportPost(userId, postId, whyReported, dateOfRep) VALUES (1, 1, "it was mean", NOW());
