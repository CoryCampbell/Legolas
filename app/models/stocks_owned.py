from .db import db, environment, SCHEMA, add_prefix_for_prod


class Stocks_owned(db.Model):
    __tablename__ = "stocks_owned"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    company_id = db.Column(
      db.Integer, db.ForeignKey(add_prefix_for_prod("companies.id"))
    )
    amt_shares = db.Column(
      db.Float(6))
    stock_price = db.Column(
      db.Float(6)
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "company_id": self.company_id,
            "amt_shares": self.amt_shares,
            "stock_price": self.stock_price
        }
