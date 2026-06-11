import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")

    SESSION_COOKIE_SAMESITE = "None"
    SESSION_COOKIE_SECURE = True