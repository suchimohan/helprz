from app.models import db, Task
from datetime import datetime


# Adds a task for demo user
def seed_tasks():
    task1 = Task(
        requestUserId= 1,
        taskerId= 6,
        citiesId= 1,
        taskTypesId = 8,
        # dateTime = datetime.now(),
        dateTime = datetime.fromisoformat('2021-12-28T08:00:00'),
        taskDescription = "Need to shop for groceries in Costco",
        duration = "1 hr",
        status = "created"
        )

    db.session.add(task1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
