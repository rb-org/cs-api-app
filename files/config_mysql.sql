CREATE USER 'csapi'@'%' IDENTIFIED BY 'DifficultPassw0rd!';
CREATE USER 'csapi'@'localhost' IDENTIFIED BY 'DifficultPassw0rd!';

CREATE DATABASE cspeople;
USE cspeople
GRANT ALL ON cspeople.* TO 'csapi'@'%' IDENTIFIED BY 'DifficultPassw0rd!' WITH GRANT OPTION;
GRANT ALL ON cspeople.* TO 'csapi'@'localhost' IDENTIFIED BY 'DifficultPassw0rd!' WITH GRANT OPTION;

USE cspeople

DROP TABLE IF EXISTS person;

CREATE TABLE person(
  person_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  Survived BOOLEAN,
  Pclass TEXT,
  Name TEXT,
  Sex TEXT,
  Age TEXT,
  SiblingsSpousesAboard TEXT,
  ParentsChildrenAboard TEXT,
  Fare TEXT,
  timestamp TIMESTAMP
);
COMMIT;


mysqlimport --fields-terminated-by=, --columns='Survived,Pclass,Name,Sex,Age,SiblingsSpousesAboard,ParentsChildrenAboard,Fare' --local -u root -p cspeople ./person.csv


Survived,
Pclass,
Name,
Sex,
Age,
SiblingsSpousesAboard,
ParentsChildrenAboard,
Fare,