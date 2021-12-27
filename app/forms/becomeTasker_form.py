from flask_wtf import FlaskForm
from wtforms import TextAreaField, DecimalField, IntegerField
from wtforms.validators import DataRequired


class NewTaskerForm(FlaskForm):
    taskName = IntegerField('taskName',validators=[DataRequired()])
    description = TextAreaField('description',validators=[DataRequired()])
    experience = IntegerField('experience',validators=[DataRequired()])
    city = IntegerField('city',validators=[DataRequired()])
    price = DecimalField('price',validators=[DataRequired()])
