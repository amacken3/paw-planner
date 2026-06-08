from app.extensions import db

class Medication(db.Model):
    __tablename__ = "medications"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    dosage = db.Column(db.Float)
    unit = db.Column(db.String)
    instructions = db.Column(db.Text)
    frequency = db.Column(db.String)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    notes = db.Column(db.Text)
    
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.id"), nullable=False)

    pet = db.relationship("Pet", back_populates="medications")

    care_events = db.relationship(
        "CareEvent",
        back_populates="medication",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Medication {self.id}: {self.name}>"