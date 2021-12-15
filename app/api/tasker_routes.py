from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Tasker

tasker_routes = Blueprint('taskers', __name__)

@tasker_routes.route('/', methods=['GET'])
def get_taskers():
    tasker = Tasker.query.get(1)
    if tasker:
        tasker = tasker.to_dict()
        return tasker
    else:
        return {'message' : 'Tasker not found'}
