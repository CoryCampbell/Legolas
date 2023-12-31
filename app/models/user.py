from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    balance = db.Column(db.Float(2), default=0)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    transactions = db.relationship("Transaction", backref="user")
    stocks_owned = db.relationship("Stocks_owned", backref="user")
    stocks = db.relationship("Portfolio", backref="user")
    watchlist = db.relationship("Watchlist", backref="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {"id": self.id, "first_name": self.first_name, "last_name": self.last_name, "balance": self.balance, "username": self.username, "email": self.email}
