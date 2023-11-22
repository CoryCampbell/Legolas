from .db import db, environment, SCHEMA, add_prefix_for_prod


class Watchlist_details(db.Model):
    __tablename__ = "watchlists_details"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("watchlists.id")))
    company_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("company.id")), nullable=False
    )

    watchlists = db.relationship('Watchlist', backref='watchlist_details')
    company = db.relationship('Company', backref='watchlist_details')

    def to_dict(self):
        return {
            "id": self.id,
            "watchlist_id": self.watchlist_id,
            "company_id": self.company_id
        }
