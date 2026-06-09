from datetime import datetime

from flask import Blueprint, request, session

from app.extensions import db
from app.models import Pet, Medication
from app.schemas import MedicationSchema

medication_bp = Blueprint("medication_bp", __name__)
medication_schema = MedicationSchema()
medications_schema = MedicationSchema(many=True)

def parse_date(date_string):
    if not date_string:
        return None

    try:
        return datetime.strptime(date_string, "%Y-%m-%d").date()
    except ValueError:
        return None


@medication_bp.get("/pets/<int:pet_id>/medications")
def get_medications(pet_id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pet = Pet.query.filter_by(id=pet_id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404

    return medications_schema.dump(pet.medications), 200


@medication_bp.post("/pets/<int:pet_id>/medications")
def create_medication(pet_id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pet = Pet.query.filter_by(id=pet_id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404

    data = request.get_json() or {}

    name = data.get("name")
    dosage = data.get("dosage")
    unit = data.get("unit")
    instructions = data.get("instructions")
    frequency = data.get("frequency")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    notes = data.get("notes")

    if not name:
        return {"error": "Medication name is required."}, 400

    parsed_start_date = parse_date(start_date)
    parsed_end_date = parse_date(end_date)

    if start_date and not parsed_start_date:
        return {"error": "start_date must use YYYY-MM-DD format."}, 400

    if end_date and not parsed_end_date:
        return {"error": "end_date must use YYYY-MM-DD format."}, 400

    medication = Medication(
        name=name,
        dosage=dosage,
        unit=unit,
        instructions=instructions,
        frequency=frequency,
        start_date=parsed_start_date,
        end_date=parsed_end_date,
        notes=notes,
        pet_id=pet.id
    )

    try:
        db.session.add(medication)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to create medication."}, 500

    return medication_schema.dump(medication), 201

@medication_bp.patch("/medications/<int:id>")
def update_medication(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    medication = (
        Medication.query
        .join(Pet)
        .filter(Medication.id == id, Pet.user_id == user_id)
        .first()
    )

    if not medication:
        return {"error": "Medication not found."}, 404

    data = request.get_json() or {}

    if "name" in data:
        medication.name = data.get("name")

    if "dosage" in data:
        medication.dosage = data.get("dosage")

    if "unit" in data:
        medication.unit = data.get("unit")

    if "instructions" in data:
        medication.instructions = data.get("instructions")

    if "frequency" in data:
        medication.frequency = data.get("frequency")

    if "start_date" in data:
        parsed_start_date = parse_date(data.get("start_date"))

        if data.get("start_date") and not parsed_start_date:
            return {"error": "start_date must use YYYY-MM-DD format."}, 400

        medication.start_date = parsed_start_date

    if "end_date" in data:
        parsed_end_date = parse_date(data.get("end_date"))

        if data.get("end_date") and not parsed_end_date:
            return {"error": "end_date must use YYYY-MM-DD format."}, 400

        medication.end_date = parsed_end_date

    if "notes" in data:
        medication.notes = data.get("notes")

    if not medication.name:
        return {"error": "Medication name is required."}, 400

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to update medication."}, 500

    return medication_schema.dump(medication), 200


@medication_bp.delete("/medications/<int:id>")
def delete_medication(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    medication = (
        Medication.query
        .join(Pet)
        .filter(Medication.id == id, Pet.user_id == user_id)
        .first()
    )

    if not medication:
        return {"error": "Medication not found."}, 404

    try:
        db.session.delete(medication)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to delete medication."}, 500

    return {}, 204