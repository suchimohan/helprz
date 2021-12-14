from app.models import db, TaskType
import json

MOCK_TASKTYPES_FP = "./app/seeds/mock_data/top_taskTypes.json"

def load_mock_data():
        """Loads mock taskTypes json data as python dict."""
        with open(MOCK_TASKTYPES_FP) as file:
                taskTypes = json.load(file)
        return taskTypes


def seed_taskTypes():
    """Seeds mock taskTypes"""
    mock_data = load_mock_data()
    for mock_taskType in mock_data:
        new_taskType = TaskType(
            name = mock_taskType["name"],
            taskImageURL = mock_taskType["taskImageURL"],
            avgPrice = mock_taskType["avgPrice"]
        )
        db.session.add(new_taskType)
    db.session.commit()


def undo_taskTypes():
    db.session.execute('TRUNCATE "taskTypes" RESTART IDENTITY CASCADE;')
    db.session.commit()
