from app.extensions import db


class CareEvent(db.Model):
    __tablename__ = "care_events"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    scheduled_for = db.Column(db.DateTime)
    completed_at = db.Column(db.DateTime)
    status = db.Column(db.String, default="pending")
    notes = db.Column(db.Text)

    pet_id = db.Column(db.Integer, db.ForeignKey("pets.id"), nullable=False)
    care_routine_id = db.Column(db.Integer, db.ForeignKey("care_routines.id"), nullable=True)
    medication_id = db.Column(db.Integer, db.ForeignKey("medications.id"), nullable=True)

    pet = db.relationship("Pet", back_populates="care_events")
    care_routine = db.relationship("CareRoutine", back_populates="care_events")
    medication = db.relationship("Medication", back_populates="care_events")

    def __repr__(self):
        return f"<CareEvent {self.id}: {self.title}>"