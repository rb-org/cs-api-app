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


mysqlimport --fields-terminated-by=, --columns='Survived,Pclass,Name,Sex,Age,SiblingsSpousesAboard,ParentsChildrenAboard,Fare' --local -u d020rdsadmin -p people ./person.csv
sudo mysqlimport --fields-terminated-by=, --columns='Survived,Pclass,Name,Sex,Age,SiblingsSpousesAboard,ParentsChildrenAboard,Fare' --local -h d020-rds-mysql.che5sckijrcn.eu-west-1.rds.amazonaws.com -u d020rdsadmin -p people ./person.csv

INSERT INTO person VALUES(1,0,3,'Mr. Owen Harris Braund','male',22,1,0,'7.25', NOW());