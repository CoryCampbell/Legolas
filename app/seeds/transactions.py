from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text


# Adds transactions, you can add other transactions here if you want
def seed_transactions():
    demo_transaction1 = Transaction(
        total=189.95, user_id=1, company_id=1, type="buy")
    demo_transaction2 = Transaction(
        total=233.77, user_id=2, company_id=2, type="sell")
    demo_transaction3 = Transaction(
        total=367.49, user_id=3, company_id=3, type="buy")
    demo_transaction4 = Transaction(
        total=145.37, user_id=3, company_id=4, type="sell")
    demo_transaction5 = Transaction(
        total=13.02, user_id=2, company_id=5, type="buy")
    demo_transaction6 = Transaction(
        total=465.88, user_id=2, company_id=6, type="buy")
    demo_transaction7 = Transaction(
        total=360.69, user_id=1, company_id=7, type="buy")

    db.session.add(demo_transaction1)
    db.session.add(demo_transaction2)
    db.session.add(demo_transaction3)
    db.session.add(demo_transaction4)
    db.session.add(demo_transaction5)
    db.session.add(demo_transaction6)
    db.session.add(demo_transaction7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transactions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
