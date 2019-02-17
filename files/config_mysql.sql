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
  Survived INTEGER,
  Pclass INTEGER,
  Name TEXT,
  Sex TEXT,
  Age INTEGER,
  SiblingsSpousesAboard INTEGER,
  ParentsChildrenAboard INTEGER,
  Fare DECIMAL(5,2),
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