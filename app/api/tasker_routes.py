from flask import Blueprint, request
from app.models import db, Tasker
from flask_login import current_user
from app.forms import NewTaskerForm
from app.forms import EditTaskerForm

tasker_routes = Blueprint('taskers', __name__)

@tasker_routes.route('/<int:id>', methods=['GET'])
def get_taskers(id):
    tasker = Tasker.query.get(id)
    if tasker:
        tasker = tasker.to_dict()
        return tasker
    else:
        return {'message' : 'Tasker not found'}

@tasker_routes.route('/new',methods=['POST'])
def add_new_tasker():
    currentUser = current_user.to_dict()
    form = NewTaskerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("///////////////////////////////////////", form.data)
    if form.validate_on_submit():
        tasker = Tasker(
            userId = currentUser['id'],
            taskTypesId = int(form.data['taskName']),
            citiesId = int(form.data['city']),
            description = form.data['description'],
            experience = form.data['experience'],
            price = form.data['price']
        )
        db.session.add(tasker)
        db.session.commit()
        return tasker.to_dict()
    else:
        return {'message' : 'Bad Data'}


@tasker_routes.route('/search/<int:userId>', methods=['GET'])
def search_tasker(userId):
  searchResult = Tasker.query.filter(Tasker.userId == userId).all()
  if searchResult:
    result = {r.id : r.to_dict() for r in searchResult}
    return result
  else:
    return {'message': "Not Found"}


@tasker_routes.route('/city/<int:cityId>/taskType/<int:taskTypeId>', methods=['GET'])
def available_taskers(cityId,taskTypeId):
    searchResult = Tasker.query.filter(Tasker.citiesId == cityId).filter(Tasker.taskTypesId == taskTypeId).all()
    if searchResult:
        result = {r.id : r.to_dict_gettask() for r in searchResult}
        return result
    else:
        return {'message': "Not Found"}


@tasker_routes.route('/${taskerId}/edit', methods=['PUT'])
def update_tasker(taskerId):
  form = EditTaskerForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  tasker = Tasker.query.get(taskerId)
  if form.validate_on_submit():
    tasker.taskTypesId = form.data['taskName'],
    tasker.citiesId = form.data['city']
    tasker.description = form.data['description'],
    tasker.experience = form.data['experience']
    tasker.price = form.data['price'],

    db.session.commit()
    return tasker.to_dict()
  else:
    return {'message': "Bad Data"}
