from app.extensions import db, bcrypt


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)

    pets = db.relationship(
        "Pet",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    @property
    def password(self):
        raise AttributeError("Password is not readable.")
    
    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(plain_text_password.encode("utf-8")).decode("utf-8")

    def authenticate(self, plain_text_password):
        return bcrypt.check_password_hash(self.password_hash, plain_text_password.encode("utf-8"))

    def __repr__(self):
        return f"<User {self.id}: {self.username}>"