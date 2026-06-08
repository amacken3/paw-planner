from app.extensions import db


class CareRoutine(db.Model):
    __tablename__ = "care_routines"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    frequency = db.Column(db.String, nullable=False)
    time_of_day = db.Column(db.Time)
    notes = db.Column(db.Text)

    pet_id = db.Column(db.Integer, db.ForeignKey("pets.id"), nullable=False)

    pet = db.relationship("Pet", back_populates="care_routines")

    care_events = db.relationship(
        "CareEvent",
        back_populates="care_routine",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<CareRoutine {self.id}: {self.title}>"