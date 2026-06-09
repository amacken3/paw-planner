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