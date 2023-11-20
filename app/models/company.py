from .db import db, environment, SCHEMA, add_prefix_for_prod


class Company(db.Model):
    __tablename__ = 'companies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    symbol = db.Column(db.String(5), nullable=False, unique=True)
    price = db.Column(db.Float(2), nullable=False)
    about = db.Column(db.String, nullable=False)

    # Relationships
    user_stocks = db.relationship('UserStock', backref='company')
    transactions = db.relationship('Transaction', backref='company')
    watchlist_items = db.relationship('Watchlist', backref='company')
