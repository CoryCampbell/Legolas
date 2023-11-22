
from app.models import db, Watchlist_detail, environment, SCHEMA
from sqlalchemy.sql import text


# Adds watchlists, you can add other watchlists here if you want
def seed_watchlist_details():
    demo_watchlist_details1 = Watchlist_detail(
        watchlist_id=1,
        company_id=1
    )
    demo_watchlist_details2 = Watchlist_detail(
        watchlist_id=2,
        company_id=2
    )
    demo_watchlist_details3 = Watchlist_detail(
        watchlist_id=3,
        company_id=3
    )
    demo_watchlist_details4 = Watchlist_detail(
        watchlist_id=4,
        company_id=4
    )
    demo_watchlist_details5 = Watchlist_detail(
        watchlist_id=5,
        company_id=5
    )
    demo_watchlist_details6 = Watchlist_detail(
        watchlist_id=6,
        company_id=6
    )
    demo_watchlist_details7 = Watchlist_detail(
        watchlist_id=7,
        company_id=7
    )
    demo_watchlist_details8 = Watchlist_detail(
        watchlist_id=1,
        company_id=2
    )

    db.session.add(demo_watchlist_details1)
    db.session.add(demo_watchlist_details2)
    db.session.add(demo_watchlist_details3)
    db.session.add(demo_watchlist_details4)
    db.session.add(demo_watchlist_details5)
    db.session.add(demo_watchlist_details6)
    db.session.add(demo_watchlist_details7)
    db.session.add(demo_watchlist_details8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlist_details():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.watchlist_details RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_details"))

    db.session.commit()
