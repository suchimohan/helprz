from flask_wtf import FlaskForm
from wtforms import TextAreaField, DecimalField, IntegerField
from wtforms.validators import DataRequired,ValidationError

def check_experience(form,field):
    experience = field.data
    if experience < 0 or experience > 99:
        raise ValidationError('Experience must be between 0 - 99.')

def check_price(form,field):
    price = field.data
    if price < 1 or price > 500:
        raise ValidationError('Price must be between 1 - 500.')

class NewTaskerForm(FlaskForm):
    taskName = IntegerField('taskName',validators=[DataRequired()])
    description = TextAreaField('description',validators=[DataRequired()])
    experience = IntegerField('experience',validators=[DataRequired(),check_experience])
    city = IntegerField('city',validators=[DataRequired()])
    price = DecimalField('price',validators=[DataRequired(),check_price])
