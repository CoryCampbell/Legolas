from .db import db, environment, SCHEMA, add_prefix_for_prod


class Watchlist_detail(db.Model):
    __tablename__ = "watchlist_details"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("watchlists.id")))
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("companies.id")))


    companies = db.relationship('Company', backref='watchlist_detail')


    def to_dict(self):
        return {
            "id": self.id,
            "watchlist_id": self.watchlist_id,
            "company_id": self.company_id
        }
