
from app.models import db, Stocks_owned, environment, SCHEMA
from sqlalchemy.sql import text


# Adds watchlists, you can add other watchlists here if you want
def seed_stocks_owned():
    demo_stocks_owned1 = Stocks_owned(
        user_id=1, company_id=1, amt_shares=1, stock_price=189.95)
    demo_stocks_owned2 = Stocks_owned(
        user_id=2, company_id=2, amt_shares=1, stock_price=233.77)
    demo_stocks_owned8 = Stocks_owned(
        user_id=1, company_id=2, amt_shares=1, stock_price=233.77)
    demo_stocks_owned3 = Stocks_owned(
        user_id=3, company_id=3, amt_shares=1, stock_price=367.49)
    demo_stocks_owned4 = Stocks_owned(
        user_id=4, company_id=4, amt_shares=1, stock_price=145.37)
    demo_stocks_owned5 = Stocks_owned(
        user_id=5, company_id=5, amt_shares=1, stock_price=13.02)
    demo_stocks_owned6 = Stocks_owned(
        user_id=6, company_id=6, amt_shares=1, stock_price=465.88)
    demo_stocks_owned7 = Stocks_owned(
        user_id=7, company_id=7, amt_shares=1, stock_price=360.69)

    db.session.add(demo_stocks_owned1)
    db.session.add(demo_stocks_owned2)
    db.session.add(demo_stocks_owned3)
    db.session.add(demo_stocks_owned4)
    db.session.add(demo_stocks_owned5)
    db.session.add(demo_stocks_owned6)
    db.session.add(demo_stocks_owned7)
    db.session.add(demo_stocks_owned8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stocks_owned():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.stocks_owned RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks_owned"))

    db.session.commit()
