from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Transaction(db.Model):

    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        'companies.id')), nullable=False)
    total = db.Column(db.Float(2), nullable=False)
    # Added field 'type' for transaction type
    type = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now,
                           onupdate=datetime.now, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "company_id": self.company_id,
            "total": self.total,
            "type": self.type,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
