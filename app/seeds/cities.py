from app.models import db, City
import json

MOCK_CITY_FP = "./app/seeds/mock_data/top_cities.json"

def load_mock_data():
        """Loads mock cities json data as python dict."""
        with open(MOCK_CITY_FP) as file:
                cities = json.load(file)
        return cities


def seed_cities():
    """Seeds mock cities"""
    mock_data = load_mock_data()
    for mock_city in mock_data:
        new_city = City(
            name = mock_city["name"],
        )
        db.session.add(new_city)
    db.session.commit()


def undo_cities():
    db.session.execute('TRUNCATE cities RESTART IDENTITY CASCADE;')
    db.session.commit()
