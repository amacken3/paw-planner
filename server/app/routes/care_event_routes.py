from datetime import datetime

from flask import Blueprint, request, session

from app.extensions import db
from app.models import Pet, CareRoutine, Medication, CareEvent
from app.schemas import CareEventSchema

care_event_bp = Blueprint("care_event_bp", __name__)
care_event_schema = CareEventSchema()
care_events_schema = CareEventSchema(many=True)

def parse_datetime(datetime_string):
    if not datetime_string:
        return None

    try:
        return datetime.strptime(datetime_string, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return None
    
@care_event_bp.get("/pets/<int:pet_id>/care-events")
def get_care_events(pet_id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401
    
    pet = Pet.query.filter_by(id=pet_id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404
    
    return care_events_schema.dump(pet.care_events), 200

@care_event_bp.post("/pets/<int:pet_id>/care-events")
def create_care_event(pet_id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pet = Pet.query.filter_by(id=pet_id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404

    data = request.get_json() or {}

    title = data.get("title")
    category = data.get("category")
    scheduled_for = data.get("scheduled_for")
    completed_at = data.get("completed_at")
    status = data.get("status", "pending")
    notes = data.get("notes")
    care_routine_id = data.get("care_routine_id")
    medication_id = data.get("medication_id")

    if not title or not category:
        return {"error": "Title and category are required."}, 400

    parsed_scheduled_for = parse_datetime(scheduled_for)
    parsed_completed_at = parse_datetime(completed_at)

    if scheduled_for and not parsed_scheduled_for:
        return {"error": "scheduled_for must use YYYY-MM-DD HH:MM:SS format."}, 400

    if completed_at and not parsed_completed_at:
        return {"error": "completed_at must use YYYY-MM-DD HH:MM:SS format."}, 400

    if care_routine_id:
        care_routine = CareRoutine.query.filter_by(
            id=care_routine_id,
            pet_id=pet.id
        ).first()

        if not care_routine:
            return {"error": "Care routine not found for this pet."}, 404

    if medication_id:
        medication = Medication.query.filter_by(
            id=medication_id,
            pet_id=pet.id
        ).first()

        if not medication:
            return {"error": "Medication not found for this pet."}, 404

    care_event = CareEvent(
        title=title,
        category=category,
        scheduled_for=parsed_scheduled_for,
        completed_at=parsed_completed_at,
        status=status,
        notes=notes,
        pet_id=pet.id,
        care_routine_id=care_routine_id,
        medication_id=medication_id
    )

    try:
        db.session.add(care_event)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to create care event."}, 500

    return care_event_schema.dump(care_event), 201

@care_event_bp.patch("/care-events/<int:id>")
def update_care_event(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    care_event = (
        CareEvent.query
        .join(Pet)
        .filter(CareEvent.id == id, Pet.user_id == user_id)
        .first()
    )

    if not care_event:
        return {"error": "Care event not found."}, 404

    data = request.get_json() or {}

    if "title" in data:
        care_event.title = data.get("title")

    if "category" in data:
        care_event.category = data.get("category")

    if "scheduled_for" in data:
        parsed_scheduled_for = parse_datetime(data.get("scheduled_for"))

        if data.get("scheduled_for") and not parsed_scheduled_for:
            return {"error": "scheduled_for must use YYYY-MM-DD HH:MM:SS format."}, 400

        care_event.scheduled_for = parsed_scheduled_for

    if "completed_at" in data:
        parsed_completed_at = parse_datetime(data.get("completed_at"))

        if data.get("completed_at") and not parsed_completed_at:
            return {"error": "completed_at must use YYYY-MM-DD HH:MM:SS format."}, 400

        care_event.completed_at = parsed_completed_at

    if "status" in data:
        care_event.status = data.get("status")

    if "notes" in data:
        care_event.notes = data.get("notes")

    if "care_routine_id" in data:
        care_routine_id = data.get("care_routine_id")

        if care_routine_id:
            care_routine = CareRoutine.query.filter_by(
                id=care_routine_id,
                pet_id=care_event.pet_id
            ).first()

            if not care_routine:
                return {"error": "Care routine not found for this pet."}, 404

        care_event.care_routine_id = care_routine_id

    if "medication_id" in data:
        medication_id = data.get("medication_id")

        if medication_id:
            medication = Medication.query.filter_by(
                id=medication_id,
                pet_id=care_event.pet_id
            ).first()

            if not medication:
                return {"error": "Medication not found for this pet."}, 404

        care_event.medication_id = medication_id

    if not care_event.title or not care_event.category:
        return {"error": "Title and category are required."}, 400

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to update care event."}, 500

    return care_event_schema.dump(care_event), 200

@care_event_bp.delete("/care-events/<int:id>")
def delete_care_event(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    care_event = (
        CareEvent.query
        .join(Pet)
        .filter(CareEvent.id == id, Pet.user_id == user_id)
        .first()
    )

    if not care_event:
        return {"error": "Care event not found."}, 404

    try:
        db.session.delete(care_event)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to delete care event."}, 500

    return {}, 204    