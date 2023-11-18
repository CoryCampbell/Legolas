from .db import db, environment, SCHEMA, add_prefix_for_prod


class UserStock(db.Model):
    __tablename__ = 'user_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(
        'companies.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    shares = db.Column(db.Float, nullable=False)
