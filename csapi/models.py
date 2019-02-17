from datetime import datetime
from config import db, ma


class Person(db.Model):
    __tablename__ = "person"
    person_id = db.Column(db.Integer, primary_key=True)
    Survived = db.Column(db.Boolean)
    Pclass = db.Column(db.Integer)
    Name = db.Column(db.String(32))
    Sex = db.Column(db.String(32))
    Age = db.Column(db.Integer)
    SiblingsSpousesAboard = db.Column(db.Integer)
    ParentsChildrenAboard = db.Column(db.Integer)
    Fare = db.Column(db.Numeric)
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class PersonSchema(ma.ModelSchema):
    class Meta:
        model = Person
        sqla_session = db.session
