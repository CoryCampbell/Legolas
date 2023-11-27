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
    portfolio = db.relationship('Portfolio', backref='company')
    transactions = db.relationship('Transaction', backref='company')
    stocks_owned = db.relationship('Stocks_owned', backref='company')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "symbol": self.symbol,
            "price": self.price,
            "about": self.about
        }

    def to_watchlist(self):
        return {
            "company_id": self.id,
            "company_name": self.name,
            "symbol": self.symbol,
            "price": self.price
        }
