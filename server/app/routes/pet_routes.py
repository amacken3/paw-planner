from flask import Blueprint, request, session

from app.extensions import db
from app.models import Pet
from app.schemas import PetSchema


pet_bp = Blueprint("pet_bp", __name__)
pet_schema = PetSchema()
pets_schema = PetSchema(many=True)


@pet_bp.get("/pets")
def get_pets():
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pets = Pet.query.filter_by(user_id=user_id).all()

    return pets_schema.dump(pets), 200

@pet_bp.post("/pets")
def create_pet():
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    data = request.get_json() or {}

    name = data.get("name")
    species = data.get("species")
    breed = data.get("breed")
    age = data.get("age")
    weight = data.get("weight")
    notes = data.get("notes")

    if not name or not species:
        return {"error": "Name and species are required."}, 400

    pet = Pet(
        name=name,
        species=species,
        breed=breed,
        age=age,
        weight=weight,
        notes=notes,
        user_id=user_id
    )

    try:
        db.session.add(pet)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to create pet."}, 500
    
    return pet_schema.dump(pet), 201

@pet_bp.get("/pets/<int:id>")
def get_pet(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pet = Pet.query.filter_by(id=id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404

    return pet_schema.dump(pet), 200

@pet_bp.patch("/pets/<int:id>")
def update_pet(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pet = Pet.query.filter_by(id=id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404

    data = request.get_json() or {}

    pet.name = data.get("name", pet.name)
    pet.species = data.get("species", pet.species)
    pet.breed = data.get("breed", pet.breed)
    pet.age = data.get("age", pet.age)
    pet.weight = data.get("weight", pet.weight)
    pet.notes = data.get("notes", pet.notes)

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to update pet."}, 500

    return pet_schema.dump(pet), 200

@pet_bp.delete("/pets/<int:id>")
def delete_pet(id):
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    pet = Pet.query.filter_by(id=id, user_id=user_id).first()

    if not pet:
        return {"error": "Pet not found."}, 404

    try:
        db.session.delete(pet)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to delete pet."}, 500

    return {}, 204