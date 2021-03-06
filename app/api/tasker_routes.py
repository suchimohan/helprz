from flask import Blueprint, request
from app.models import db, Tasker, Task
from flask_login import current_user
from app.forms import NewTaskerForm
from app.forms import EditTaskerForm
from datetime import date, time, datetime
from sqlalchemy import and_

tasker_routes = Blueprint('taskers', __name__)

STATUS_ACTIVE = "active"
STATUS_INACTIVE = "inactive"


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@tasker_routes.route('/<int:id>', methods=['GET'])
def get_taskers(id):
    tasker = Tasker.query.get(id)
    if tasker:
        tasker = tasker.to_dict_gettask()
        return tasker
    else:
        return {'message': 'Tasker not found'}, 404


@tasker_routes.route('/new', methods=['POST'])
def add_new_tasker():
    current_user_id = current_user.to_dict()['id']
    form = NewTaskerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tasker = Tasker(
            userId=current_user_id,
            taskTypesId=int(form.data['taskName']),
            citiesId=int(form.data['city']),
            description=form.data['description'],
            experience=form.data['experience'],
            price=form.data['price'],
            status=STATUS_ACTIVE
        )
        db.session.add(tasker)
        db.session.commit()
        return tasker.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@tasker_routes.route('/search/<int:userId>', methods=['GET'])
def search_tasker(userId):
    searchResult = Tasker.query.filter(Tasker.userId == userId).all()
    if searchResult:
        result = {r.userId: r.to_dict() for r in searchResult}
        return result
    else:
        return {'message': "Not Found"}, 404


@tasker_routes.route('/filter', methods=['GET'])
def filtered_taskers():
    # filter_taskers filter only active Taskers who dont have any overlapping Task
    current_user_id = current_user.to_dict()['id']
    city_id = request.args.get('cityId')
    task_type_id = request.args.get('taskTypeId')
    task_date = date.fromisoformat(request.args.get('date'))
    task_time = time.fromisoformat(request.args.get('time'))
    task_date_time = datetime.combine(task_date, task_time)
    ''' The ORM generates the following SQL Query to filter taskers
        select users.username, taskers.description, tasks."dateTime" from taskers
        left join tasks on tasks."taskerId" = taskers.id and tasks."dateTime" = <DATE_TIME>
        join users on users.id = taskers."userId"
        where tasks.id is null
        and taskers."taskTypesId" = <TASKTYPE_ID>
        and taskers."citiesId" = <CITY_ID>'''
    searchResult = Tasker.query.join(Task, and_(Task.taskerId == Tasker.id, Task.dateTime == task_date_time, Task.status == "created"), isouter=True).filter(
        and_(Tasker.status == STATUS_ACTIVE, Tasker.citiesId == city_id, Tasker.taskTypesId == task_type_id, Task.id == None, Tasker.userId != current_user_id)).all()
    if searchResult:
        result = {r.userId: r.to_dict_gettask() for r in searchResult}
        return result
    else:
        return {'message': "Not Found"}, 404


@tasker_routes.route('/<int:taskerId>/edit', methods=['PUT'])
def update_tasker(taskerId):
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
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@tasker_routes.route('/<int:taskerId>/delete', methods=['DELETE'])
def delete_tasker(taskerId):
    tasker = Tasker.query.get(taskerId)
    if tasker:
        tasker.status = STATUS_INACTIVE
        db.session.commit()
        return 'deleted'
    else:
        return 'failed', 401
