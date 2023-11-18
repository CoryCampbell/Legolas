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
        undo_users()
        undo_transactions()
        undo_watchlists()
        undo_user_stocks()
        undo_companies()
    # seed_users()
    # Add other seed functions here
    seed_user_stocks()
    seed_companies()
    seed_watchlists()
    seed_transactions()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
