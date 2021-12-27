from flask import Blueprint, request
from app.models import db, Tasker, Task
from flask_login import current_user
from app.forms import NewTaskerForm
from app.forms import EditTaskerForm
from datetime import date, time, datetime
from sqlalchemy import and_

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


# @tasker_routes.route('/city/<int:cityId>/taskType/<int:taskTypeId>', methods=['GET'])
# def available_taskers(cityId,taskTypeId):
#     searchResult = Tasker.query.filter(Tasker.citiesId == cityId).filter(Tasker.taskTypesId == taskTypeId).all()
#     if searchResult:
#         result = {r.id : r.to_dict_gettask() for r in searchResult}
#         return result
#     else:
#         return {'message': "Not Found"}

@tasker_routes.route('/filter', methods=['GET'])
def filtered_taskers():
  cityId = request.args.get('cityId')
  taskTypeId = request.args.get('taskTypeId')
  task_date = date.fromisoformat(request.args.get('date'))
  task_time = time.fromisoformat(request.args.get('time'))
  task_date_time = datetime.combine(task_date,task_time)
  ''' SQL Query to filter taskers///
  select users.username, taskers.description, tasks."dateTime" from taskers
  left join tasks on tasks."taskerId" = taskers.id and tasks."dateTime" = '2021-12-29 8:00:00'
  join users on users.id = taskers."userId"
  where tasks.id is null
  and taskers."taskTypesId" = 1
  and taskers."citiesId" = 1'''
  searchResult = Tasker.query.join(Task,and_(Task.taskerId == Tasker.id , Task.dateTime == task_date_time),isouter=True).filter(and_(Tasker.citiesId == cityId , Tasker.taskTypesId == taskTypeId,Task.id == None)).all()
  # searchResult = Tasker.query.filter(Tasker.citiesId == cityId).filter(Tasker.taskTypesId == taskTypeId).all()
  if searchResult:
    result = {r.id : r.to_dict_gettask() for r in searchResult}
    return result
  else:
    return {'message': "Not Found"}


@tasker_routes.route('/<int:taskerId>/edit', methods=['PUT'])
def update_tasker(taskerId):
  # print('////////////////hitting this line of code')
  form = EditTaskerForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  tasker = Tasker.query.get(taskerId)
  if form.validate_on_submit():
    tasker.taskTypesId = form.data['taskName'],
    tasker.citiesId = form.data['city'],
    tasker.description = form.data['description'],
    tasker.experience = form.data['experience'],
    tasker.price = form.data['price'],

    db.session.commit()
    return tasker.to_dict()
  else:
    return {'message': "Bad Data"}
