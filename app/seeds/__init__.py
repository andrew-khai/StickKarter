from app.models import db, environment, SCHEMA
from flask.cli import AppGroup
from .saves import seed_saves, undo_saves
from .users import seed_users, undo_users, get_users
from .categories import seed_categories, undo_categories
from .projects import seed_projects, undo_projects, get_projects
from .backings import seed_backings, undo_backings
from .rewards import seed_rewards, undo_rewards


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
        undo_backings()
        undo_rewards()
        undo_projects()
        undo_saves()
        undo_users()
        undo_categories()
    seed_categories()
    seed_users()
    seed_projects()
    seed_saves()
    # all_users = get_users()
    # all_projects = get_projects()
    seed_rewards()
    seed_backings()
    # saves = fake_saves(all_projects, all_users)
    # _ =[db.session.add(user) for user in all_users]
    # _ = [db.session.add(project) for project in all_projects]
    # db.session.commit()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_backings()
    undo_rewards()
    undo_saves()
    undo_projects()
    undo_users()
    undo_categories()
    # Add other undo functions here
