from flask.cli import AppGroup
from .users import seed_users, undo_users
from .taskTypes import seed_taskTypes, undo_taskTypes
from .cities import seed_cities, undo_cities

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_taskTypes()
    seed_cities()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_cities()
    undo_taskTypes()
    undo_users()
    # Add other undo functions here
