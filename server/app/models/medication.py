from app.extensions import db

class Medication(db.Model):
    __tablename__ = "medications"

    id = db.Column(db.Integer, primary_key=True)