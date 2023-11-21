from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demolition', balance=100.00, email='demo@aa.io', password='password')

    marnie = User(
        first_name='Marnie', last_name='Martin', username='ItsMeMarnie', balance=200.00, email='marnie@aa.io', password='password')

    bobby = User(
        first_name='Bobby', last_name='Johnson', username='OGBobbyJohnson', balance=300.00, email='bobbie@aa.io', password='password')

    cory = User(
        first_name='Cory', last_name='Campbell', username='CoryCampbell', email='cory@aa.io', password='password')

    quinn = User(
        first_name='Quinn', last_name='Bush', username='Quinn5545', balance=500.00, email='quinn@aa.io', password='password')

    ali = User(
        first_name='Ali', last_name='Keshanian', username='Ark1980', balance=600.00, email='ali@aa.io', password='password')

    malcolm = User(
        first_name='Malcolm', last_name='Caleb', username='malcolmc22', balance=700.00, email='malcolm@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobby)
    db.session.add(cory)
    db.session.add(quinn)
    db.session.add(ali)
    db.session.add(malcolm)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
