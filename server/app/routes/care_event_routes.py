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
    
    pet = Pet.query.filter_by(id=pet_id, user_id =user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404
    
    return care_event_schema.dump(pet.care_events), 200

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