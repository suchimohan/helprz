from app.models import db, Tasker
import json

MOCK_TASKER_FP = "./app/seeds/mock_data/top_taskers.json"

def load_mock_data():
        """Loads mock taskers json data as python dict."""
        with open(MOCK_TASKER_FP) as file:
                taskers = json.load(file)
        return taskers


def seed_taskers():
    """Seeds mock cities"""
    mock_data = load_mock_data()
    for mock_tasker in mock_data:
        new_tasker = Tasker(
            userId = mock_tasker["userId"],
            taskTypesId = mock_tasker["taskTypesId"],
            citiesId = mock_tasker["citiesId"],
            description = mock_tasker["description"],
            experience = mock_tasker["experience"],
            price = mock_tasker["price"],
            status = mock_tasker["status"]
        )
        db.session.add(new_tasker)
    db.session.commit()


def undo_taskers():
    db.session.execute('TRUNCATE taskers RESTART IDENTITY CASCADE;')
    db.session.commit()
