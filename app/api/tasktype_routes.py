from flask import Blueprint
from app.models import db, TaskType

tasktype_routes = Blueprint('tasktype', __name__)

@tasktype_routes.route('/', methods=['GET'])
def get_tasktypes():
  result = TaskType.query.all()
  if result:
    tasktypes = {t.id : t.to_dict() for t in result}
    return tasktypes
  else:
    return {'message': 'TaskTypes not found'}
