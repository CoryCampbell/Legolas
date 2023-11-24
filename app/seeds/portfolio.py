from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text


# Adds user stocks, you can add other user stocks here if you want
def seed_portfolio():
    demo_portfolio1 = Portfolio(user_id=1, company_id=1, price=189.95, shares=1)
    demo_portfolio8 = Portfolio(user_id=1, company_id=2, price=233.77, shares=1)
    demo_portfolio2 = Portfolio(user_id=2, company_id=2, price=233.77, shares=1)
    demo_portfolio3 = Portfolio(user_id=3, company_id=3, price=367.49, shares=1)
    demo_portfolio4 = Portfolio(user_id=4, company_id=4, price=145.37, shares=1)
    demo_portfolio5 = Portfolio(user_id=5, company_id=5, price=13.02, shares=1)
    demo_portfolio6 = Portfolio(user_id=6, company_id=6, price=465.88, shares=1)
    demo_portfolio7 = Portfolio(user_id=7, company_id=7, price=360.69, shares=1)

    db.session.add(demo_portfolio1)
    db.session.add(demo_portfolio2)
    db.session.add(demo_portfolio3)
    db.session.add(demo_portfolio4)
    db.session.add(demo_portfolio5)
    db.session.add(demo_portfolio6)
    db.session.add(demo_portfolio7)
    db.session.add(demo_portfolio8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_portfolio():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE TABLE {SCHEMA}.portfolio RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM portfolio"))

    db.session.commit()
