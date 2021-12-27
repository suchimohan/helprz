from flask_wtf import FlaskForm
from wtforms import StringField,TextAreaField, DecimalField, IntegerField, DateField,TimeField
from wtforms.validators import DataRequired

class AddTaskForm(FlaskForm):
    requestUserId = IntegerField('requestUserId',validators=[DataRequired()])
    taskerId = IntegerField('taskerId',validators=[DataRequired()])
    taskTypeId = IntegerField('taskTypeId',validators=[DataRequired()])
    city = IntegerField('city',validators=[DataRequired()])
    taskDescription = TextAreaField('taskDescription',validators=[DataRequired()])
    duration = StringField('duration',validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired()])
    time = TimeField('time', validators=[DataRequired()])
