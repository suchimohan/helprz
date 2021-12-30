from app.models import db, Task
from datetime import datetime


# Adds a task for demo user
def seed_tasks():

    task1 = Task(
        requestUserId= 1,
        taskerId= 4,
        citiesId= 1,
        taskTypesId = 2,
        dateTime = datetime.fromisoformat('2021-12-25T08:00:00'),
        taskDescription = "Need to assemble ikea wardrobe",
        duration = "1 hr",
        status = "tasker_cancelled"
        )

    task2 = Task(
        requestUserId= 1,
        taskerId= 4,
        citiesId= 1,
        taskTypesId = 2,
        dateTime = datetime.fromisoformat('2021-12-27T12:00:00'),
        taskDescription = "Need to assemble ikea wardrobe",
        duration = "1 hr",
        status = "completed"
        )

    task3 = Task(
        requestUserId= 1,
        taskerId= 6,
        citiesId= 1,
        taskTypesId = 8,
        # dateTime = datetime.now(),
        dateTime = datetime.fromisoformat('2021-12-28T08:00:00'),
        taskDescription = "Need to shop for groceries in Costco",
        duration = "1 hr",
        status = "completed"
        )


    task4 = Task(
        requestUserId= 1,
        taskerId= 4,
        citiesId= 1,
        taskTypesId = 2,
        dateTime = datetime.fromisoformat('2021-12-29T08:00:00'),
        taskDescription = "Need to assemble ikea wardrobe",
        duration = "1 hr",
        status = "user_cancelled"
        )

    task5 = Task(
        requestUserId= 1,
        taskerId= 4,
        citiesId= 1,
        taskTypesId = 2,
        dateTime = datetime.fromisoformat('2022-01-02T08:00:00'),
        taskDescription = "Need to assemble ikea wardrobe",
        duration = "1 hr",
        status = "created"
        )

    task6 = Task(
        requestUserId= 1,
        taskerId= 4,
        citiesId= 1,
        taskTypesId = 2,
        dateTime = datetime.fromisoformat('2022-02-02T08:00:00'),
        taskDescription = "Need to assemble ikea wardrobe",
        duration = "1 hr",
        status = "created"
        )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
