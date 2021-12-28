from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired


class EditTaskForm(FlaskForm):
    editedTaskDescription = TextAreaField('editedTaskDescription',validators=[DataRequired()])
