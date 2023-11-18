from app.models import db, UserStock, environment, SCHEMA
from sqlalchemy.sql import text


# Adds user stocks, you can add other user stocks here if you want
def seed_user_stocks():
    demo_user_stock1 = UserStock(
        user_id=1, company_id=1, price=189.95, shares=3)
    demo_user_stock2 = UserStock(
        user_id=2, company_id=2, price=233.77, shares=2)
    demo_user_stock3 = UserStock(
        user_id=3, company_id=3, price=367.49, shares=1)
    demo_user_stock4 = UserStock(
        user_id=2, company_id=4, price=145.37, shares=5)
    demo_user_stock5 = UserStock(
        user_id=2, company_id=5, price=13.02, shares=1)
    demo_user_stock6 = UserStock(
        user_id=3, company_id=6, price=465.88, shares=7)
    demo_user_stock7 = UserStock(
        user_id=1, company_id=7, price=360.69, shares=4)

    db.session.add(demo_user_stock1)
    db.session.add(demo_user_stock2)
    db.session.add(demo_user_stock3)
    db.session.add(demo_user_stock4)
    db.session.add(demo_user_stock5)
    db.session.add(demo_user_stock6)
    db.session.add(demo_user_stock7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_stocks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE TABLE {SCHEMA}.user_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_stocks"))

    db.session.commit()
