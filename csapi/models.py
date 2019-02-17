from datetime import datetime
from config import db, ma


class Person(db.Model):
    __tablename__ = "person"
    person_id = db.Column(db.Integer, primary_key=True)
    Survived = db.Column(db.Boolean)
    Pclass = db.Column(db.String(32))
    Name = db.Column(db.String(32))
    Sex = db.Column(db.String(32))
    Age = db.Column(db.String(32))
    SiblingsSpousesAboard = db.Column(db.String(32))
    ParentsChildrenAboard = db.Column(db.String(32))
    Fare = db.Column(db.String(32))
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class PersonSchema(ma.ModelSchema):
    class Meta:
        model = Person
        sqla_session = db.session
