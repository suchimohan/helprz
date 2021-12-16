from flask import Blueprint
from app.models import db, City

cities_routes = Blueprint('cities',__name__)

@cities_routes.route('/', methods=['GET'])
def get_cities():
  result = City.query.all()
  if result:
    cities = {c.id : c.to_dict() for c in result}
    return cities
  else:
    return {'message': 'Cities not found'}
