from flask import Blueprint, request
from app.models import db, Task
from flask_login import current_user
from app.forms import AddTaskForm
from datetime import datetime


task_routes = Blueprint('tasks', __name__)

@task_routes.route('/new',methods=["POST"])
def add_new_task():
    form = AddTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task(
            requestUserId = form.data['requestUserId'],
            taskerId = form.data['taskerId'],
            taskTypesId = int(form.data['taskTypeId']),
            citiesId = int(form.data['city']),
            dateTime = datetime.combine(form.data['date'], form.data['time']),
            taskDescription = form.data['taskDescription'],
            duration = form.data['duration'],
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    else:
        return {'message' : 'Bad Data'}



@task_routes.route('/<int:userId>',methods=["GET"])
def get_tasks(userId):
    result = Task.query.filter(Task.requestUserId == userId).all()
    if result:
        tasks = {t.id : t.to_dict() for t in result}
        return tasks
    else:
        return {'message': "Not Found"}
