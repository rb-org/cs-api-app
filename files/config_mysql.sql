CREATE USER 'csapi'@'%' IDENTIFIED BY 'DifficultPassw0rd!';
CREATE USER 'csapi'@'localhost' IDENTIFIED BY 'DifficultPassw0rd!';

CREATE DATABASE people;
USE people
GRANT ALL ON people.* TO 'csapi'@'%' IDENTIFIED BY 'DifficultPassw0rd!' WITH GRANT OPTION;
GRANT ALL ON people.* TO 'csapi'@'localhost' IDENTIFIED BY 'DifficultPassw0rd!' WITH GRANT OPTION;

USE people

DROP TABLE IF EXISTS person;

CREATE TABLE person(
  person_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  Survived BOOLEAN,
  Pclass INTEGER,
  Name TEXT,
  Sex TEXT,
  Age INTEGER,
  SiblingsSpousesAboard INTEGER,
  ParentsChildrenAboard INTEGER,
  Fare TEXT,
  timestamp TIMESTAMP
);
COMMIT;


mysqlimport --fields-terminated-by=, --columns='Survived,Pclass,Name,Sex,Age,SiblingsSpousesAboard,ParentsChildrenAboard,Fare' --local -u root -p people ./person.csv


Survived,
Pclass,
Name,
Sex,
Age,
SiblingsSpousesAboard,
ParentsChildrenAboard,
Fare,


INSERT INTO person VALUES(1,0,3,'Mr. Owen Harris Braund','male',22,1,0,'7.25', NOW());