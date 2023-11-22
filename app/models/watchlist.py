from .db import db, environment, SCHEMA, add_prefix_for_prod


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    watchlist_details = db.relationship('Watchlist_detail', backref='watchlist')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id
        }
