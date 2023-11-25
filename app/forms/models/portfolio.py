from .db import db, environment, SCHEMA, add_prefix_for_prod


class Portfolio(db.Model):
    __tablename__ = "portfolio"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    company_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("companies.id")), nullable=False
    )
    price = db.Column(db.Float(2), nullable=False)
    shares = db.Column(db.Float(6), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "company_id": self.company_id,
            "price": self.price,
            "shares": self.shares,
        }
