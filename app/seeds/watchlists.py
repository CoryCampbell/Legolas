
from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds watchlists, you can add other watchlists here if you want
def seed_watchlists():
    demo_watchlist1 = Watchlist(
        user_id=1, name='Companies to Watch1')
    demo_watchlist2 = Watchlist(
        user_id=2, name='Companies to Watch2')
    demo_watchlist3 = Watchlist(
        user_id=3, name='Companies to Watch3')
    demo_watchlist4 = Watchlist(
        user_id=4, name='Companies to Watch4')
    demo_watchlist5 = Watchlist(
        user_id=5, name='Companies to Watch5')
    demo_watchlist6 = Watchlist(
        user_id=6, name='Companies to Watch6')
    demo_watchlist7 = Watchlist(
        user_id=7, name='Companies to Watch7')

    db.session.add(demo_watchlist1)
    db.session.add(demo_watchlist2)
    db.session.add(demo_watchlist3)
    db.session.add(demo_watchlist4)
    db.session.add(demo_watchlist5)
    db.session.add(demo_watchlist6)
    db.session.add(demo_watchlist7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
