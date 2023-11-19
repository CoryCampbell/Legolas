from flask.cli import AppGroup
from .users import seed_users, undo_users
from .companies import seed_companies, undo_companies
from .transactions import seed_transactions, undo_transactions
from .user_stocks import seed_user_stocks, undo_user_stocks
from .watchlists import seed_watchlists, undo_watchlists

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_watchlists()
        undo_transactions()
        undo_user_stocks()
        undo_companies()
        undo_users()
    seed_users()
    # Add other seed functions here
    seed_companies()
    seed_user_stocks()
    seed_transactions()
    seed_watchlists()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_stocks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watchlists")
        db.session.execute("DELETE FROM transactions")
        db.session.execute("DELETE FROM user_stocks")
        db.session.execute("DELETE FROM companies")
        db.session.execute("DELETE FROM users")

    db.session.commit()
