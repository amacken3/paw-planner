from datetime import datetime

from flask import Blueprint, request, session

from app.extensions import db
from app.models import Pet, CareRoutine
from app.schemas import CareRoutineSchema


care_routine_bp = Blueprint("care_routine_bp", __name__)
care_routine_schema = CareRoutineSchema()
care_routines_schema = CareRoutineSchema(many=True)


def parse_time(time_string):
    if not time_string:
        return None

    try:
        return datetime.strptime(time_string, "%H:%M:%S").time()
    except ValueError:
        return None


@care_routine_bp.get("/pets/<int:pet_id>/care-routines")
def get_care_routines(pet_id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pet = Pet.query.filter_by(id=pet_id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404

    return care_routines_schema.dump(pet.care_routines), 200


@care_routine_bp.post("/pets/<int:pet_id>/care-routines")
def create_care_routine(pet_id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pet = Pet.query.filter_by(id=pet_id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404

    data = request.get_json() or {}

    title = data.get("title")
    category = data.get("category")
    frequency = data.get("frequency")
    time_of_day = data.get("time_of_day")
    notes = data.get("notes")

    if not title or not category or not frequency:
        return {"error": "Title, category, and frequency are required."}, 400

    parsed_time = parse_time(time_of_day)

    if time_of_day and not parsed_time:
        return {"error": "time_of_day must use HH:MM:SS format."}, 400

    care_routine = CareRoutine(
        title=title,
        category=category,
        frequency=frequency,
        time_of_day=parsed_time,
        notes=notes,
        pet_id=pet.id
    )

    try:
        db.session.add(care_routine)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to create care routine."}, 500

    return care_routine_schema.dump(care_routine), 201


@care_routine_bp.patch("/care-routines/<int:id>")
def update_care_routine(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    care_routine = (
        CareRoutine.query
        .join(Pet)
        .filter(CareRoutine.id == id, Pet.user_id == user_id)
        .first()
    )

    if not care_routine:
        return {"error": "Care routine not found."}, 404

    data = request.get_json() or {}

    if "title" in data:
        care_routine.title = data.get("title")

    if "category" in data:
        care_routine.category = data.get("category")

    if "frequency" in data:
        care_routine.frequency = data.get("frequency")

    if "time_of_day" in data:
        parsed_time = parse_time(data.get("time_of_day"))

        if data.get("time_of_day") and not parsed_time:
            return {"error": "time_of_day must use HH:MM:SS format."}, 400

        care_routine.time_of_day = parsed_time

    if "notes" in data:
        care_routine.notes = data.get("notes")

    if not care_routine.title or not care_routine.category or not care_routine.frequency:
        return {"error": "Title, category, and frequency are required."}, 400

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to update care routine."}, 500

    return care_routine_schema.dump(care_routine), 200


@care_routine_bp.delete("/care-routines/<int:id>")
def delete_care_routine(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    care_routine = (
        CareRoutine.query
        .join(Pet)
        .filter(CareRoutine.id == id, Pet.user_id == user_id)
        .first()
    )

    if not care_routine:
        return {"error": "Care routine not found."}, 404

    try:
        db.session.delete(care_routine)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to delete care routine."}, 500

    return {}, 204