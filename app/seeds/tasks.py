from app.models import db, Task
from datetime import datetime


# Adds a task for demo user
def seed_tasks():
    task1 = Task(
        requestUserId= 1,
        taskerId= 4,
        citiesId= 1,
        taskTypesId = 8,
        dateTime = datetime.now(),
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
