from app.extensions import db

class Pet(db.Model):
    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    notes = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="pets")

    care_routines = db.relationship(
        "CareRoutine",
        back_populates="pet",
        cascade="all, delete-orphan"
    )

    medications = db.relationship(
        "Medication",
        back_populates="pet",
        cascade="all, delete-orphan"
    )

    care_events = db.relationship(
        "CareEvent",
        back_populates="pet",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Pet {self.id}: {self.name}>"