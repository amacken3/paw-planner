from flask import Blueprint, request, session
from app.extensions import db
from app.models import User
from app.schemas import UserSchema

auth_bp = Blueprint("auth_bp", __name__)
user_schema = UserSchema()

@auth_bp.post("/signup")
def signup():
    data = request.get_json() or {}

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return {"error": "Username, email, and password are required."}, 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return {"error": "Email is already in use."}, 400

    user = User(username=username, email=email)
    user.password = password

    try:
        db.session.add(user)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": "Unable to create user."}, 500

    session["user_id"] = user.id

    return user_schema.dump(user), 201

@auth_bp.post("/login")
def login():
    data = request.get_json() or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"error": "Email and password are required."}, 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.authenticate(password):
        return {"error": "Invalid email or password."}, 401

    session["user_id"] = user.id

    return user_schema.dump(user), 200

@auth_bp.get("/check_session")
def check_session():
    user_id = session.get("user_id")

    if not user_id:
        return {"error": "Not authenticated."}, 401

    user = db.session.get(User, user_id)

    if not user:
        session.pop("user_id", None)
        return {"error": "User not found."}, 404

    return user_schema.dump(user), 200

@auth_bp.delete("/logout")
def logout():
    session.pop("user_id", None)
    return {}, 204