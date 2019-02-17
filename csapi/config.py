import os
import connexion
import pymysql
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

basedir = os.path.abspath(os.path.dirname(__file__))
db_user = os.environ.get('db_user')
db_password = os.environ.get('db_password')
db_address = os.environ.get('db_address')
# db_port = os.environ.get('db_port')
db_database = os.environ.get('db_database')

# Create the connexion application instance
connex_app = connexion.App(__name__, specification_dir=basedir)

# Get the underlying Flask app instance
app = connex_app.app

# Build the mysqlclient URI for SqlAlchemy
sql_url = "mysql://{}:{}@{}/{}".format(db_user, db_password, 
                                       db_address, db_database)

##################################
#
# if os.environ.get('db_type') == 'mysql':
#   if os.environ.get('db_port') != '':
#     sql_url = "mysql+pymysql://{}:{}@{}:{}/{}".format(db_user,db_password,
#                                                       db_address,db_port,db_database)
#   else:
#     sql_url = "mysql://{}:{}@{}/{}".format(db_user, db_password, db_address, 
#                                            db_database)
# elif os.environ.get('db_type') == 'sqlite':
#   sql_url = "sqlite:////" + os.path.join(basedir, "people.db")
#
##################################

# Configure the SqlAlchemy part of the app instance
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = sql_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create the SqlAlchemy db instance
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)
