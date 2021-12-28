from flask import Blueprint, request
from app.models import db, Task
from flask_login import current_user
from app.forms import AddTaskForm
from datetime import datetime
from app.forms import EditTaskForm


task_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@task_routes.route('/new',methods=["POST"])
def add_new_task():
    form = AddTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("/////////////////form data", form.data)
    if form.validate_on_submit():
        print("/////////////////form data after validation", form.data)
        task = Task(
            requestUserId = form.data['requestUserId'],
            taskerId = form.data['taskerId'],
            taskTypesId = int(form.data['taskTypeId']),
            citiesId = int(form.data['city']),
            dateTime = datetime.combine(form.data['date'], form.data['time']),
            taskDescription = form.data['taskDescription'],
            duration = form.data['duration'],
            status = "created"
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    else:
        return {'message' : 'Bad Data'}



@task_routes.route('/<int:userId>',methods=["GET"])
def get_tasks(userId):
    result = Task.query.order_by(Task.dateTime.desc()).filter(Task.requestUserId == userId).all()
    print("check the query??????????????????????")
    if result:
        tasks = {}
        i = 0
        for t in result:
            tasks[i] = t.to_dict()
            i = i + 1
        return tasks
    else:
        return {'message': "Not Found"}


@task_routes.route('/<int:taskId>/edit',methods=["PUT"])
def updated_task(taskId):
    form = EditTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    task = Task.query.get(taskId)
    if form.validate_on_submit():
        task.taskDescription = form.data['editedTaskDescription']

        db.session.commit()
        return task.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@task_routes.route('/<int:taskId>/delete', methods=['DELETE'])
def delete_task(taskId):
  task = Task.query.get(taskId)
  if task:
    task.status = "cancelled"
    db.session.commit()
    return task.to_dict()
  else:
    return '401'
