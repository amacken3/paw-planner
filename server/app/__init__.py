from flask import Flask
from app.extensions import db, migrate, bcrypt, cors
from app.config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    cors.init_app(
    app,
    supports_credentials=True,
    origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
)

    from app import models

    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api")

    from app.routes.pet_routes import pet_bp
    app.register_blueprint(pet_bp, url_prefix="/api")

    from app.routes.care_routine_routes import care_routine_bp
    app.register_blueprint(care_routine_bp, url_prefix="/api")

    from app.routes.medication_routes import medication_bp
    app.register_blueprint(medication_bp, url_prefix="/api")

    from app.routes.care_event_routes import care_event_bp
    app.register_blueprint(care_event_bp, url_prefix="/api")

    @app.get("/api/health")
    def health_check():
        return {"message": "PawPlanner API is running"}, 200

    return app