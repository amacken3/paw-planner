# WARNING: This script clears existing data before creating demo data.
# Run locally for development/demo setup.
# Do not run against production unless you intend to reset the database.

from datetime import date, datetime, time

from app import create_app
from app.extensions import db
from app.models import User, Pet, CareRoutine, Medication, CareEvent


app = create_app()


with app.app_context():
    try:
        print("Clearing existing data...")

        CareEvent.query.delete()
        CareRoutine.query.delete()
        Medication.query.delete()
        Pet.query.delete()
        User.query.delete()

        print("Creating demo user...")

        demo_user = User(
            username="demo_user",
            email="demo@example.com"
        )
        demo_user.password = "password123"

        db.session.add(demo_user)
        db.session.flush()

        print("Creating demo pet...")

        luna = Pet(
            name="Luna",
            species="Cat",
            breed="Domestic Shorthair",
            age=4,
            weight=10.5,
            notes="Luna likes wet food and prefers morning routines.",
            user_id=demo_user.id
        )

        db.session.add(luna)
        db.session.flush()

        print("Creating care routine...")

        morning_feeding = CareRoutine(
            title="Morning Feeding",
            category="Feeding",
            frequency="Daily",
            time_of_day=time(8, 0, 0),
            notes="Feed Luna wet food in the morning.",
            pet_id=luna.id
        )

        db.session.add(morning_feeding)
        db.session.flush()

        print("Creating medication...")

        medication = Medication(
            name="Amoxicillin",
            dosage=2.5,
            unit="mL",
            instructions="Give with food.",
            frequency="Twice daily",
            start_date=date(2026, 6, 9),
            end_date=date(2026, 6, 16),
            notes="Demo medication for testing medication tracking.",
            pet_id=luna.id
        )

        db.session.add(medication)
        db.session.flush()

        print("Creating care events...")

        feeding_event = CareEvent(
            title="Morning Feeding Event",
            category="Feeding",
            scheduled_for=datetime(2026, 6, 9, 8, 0, 0),
            completed_at=datetime(2026, 6, 9, 8, 10, 0),
            status="completed",
            notes="Luna ate most of her breakfast.",
            pet_id=luna.id,
            care_routine_id=morning_feeding.id
        )

        medication_event = CareEvent(
            title="Give Amoxicillin",
            category="Medication",
            scheduled_for=datetime(2026, 6, 9, 20, 0, 0),
            completed_at=None,
            status="pending",
            notes="Evening medication dose.",
            pet_id=luna.id,
            medication_id=medication.id
        )

        db.session.add_all([feeding_event, medication_event])

        db.session.commit()

        print("Seeding complete.")

    except Exception as error:
        db.session.rollback()
        print("Seeding failed.")
        print(error)