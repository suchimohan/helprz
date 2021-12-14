from app.models import db, User
import json

MOCK_USER_FP = "./app/seeds/mock_data/top_users.json"

def load_mock_data():
        """Loads mock users json data as python dict."""
        with open(MOCK_USER_FP) as file:
                users = json.load(file)
        return users

# Adds a demo user, you can add other users here if you want
def seed_users():
    """Seeds mock users"""
    mock_data = load_mock_data()
    for mock_user in mock_data:
        new_user = User(
            username = mock_user["username"],
            email = mock_user["email"],
            password = mock_user["password"],
            profilePhotoURL = mock_user["profilePhotoURL"]
        )
        db.session.add(new_user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
