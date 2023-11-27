from flask.cli import AppGroup
from .users import seed_users, undo_users
from .companies import seed_companies, undo_companies
from .transactions import seed_transactions, undo_transactions
from .portfolio import seed_portfolio, undo_portfolio
from .stocks_owned import seed_stocks_owned, undo_stocks_owned
from .watchlists import seed_watchlists, undo_watchlists
from .watchlist_details import seed_watchlist_details, undo_watchlist_details

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
        undo_watchlist_details()
        undo_watchlists()
        undo_transactions()
        undo_portfolio()
        undo_stocks_owned()
        undo_companies()
        undo_users()
    seed_users()
    seed_companies()
    seed_stocks_owned()
    seed_portfolio()
    seed_transactions()
    seed_watchlists()
    seed_watchlist_details()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_details RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks_owned RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watchlist_details")
        db.session.execute("DELETE FROM watchlists")
        db.session.execute("DELETE FROM transactions")
        db.session.execute("DELETE FROM portfolio")
        db.session.execute("DELETE FROM stocks_owned")
        db.session.execute("DELETE FROM companies")
        db.session.execute("DELETE FROM users")

    db.session.commit()
