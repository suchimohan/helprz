from flask_wtf import FlaskForm
from wtforms import TextAreaField, DecimalField, IntegerField
from wtforms.validators import DataRequired,ValidationError

EXPERIENCE_ERROR = 'Experience must be an Integer between 0 - 99.'
PRICE_ERROR = "Price must be between 1 - 500."

def check_experience(form,field):
    experience = field.data
    if experience < 0 or experience > 99:
        raise ValidationError(EXPERIENCE_ERROR)

def check_price(form,field):
    price = field.data
    if price < 1 or price > 500:
        raise ValidationError(PRICE_ERROR)

class NewTaskerForm(FlaskForm):
    taskName = IntegerField('taskName',validators=[DataRequired()])
    description = TextAreaField('description',validators=[DataRequired()])
    experience = IntegerField('experience',validators=[DataRequired(message=EXPERIENCE_ERROR),check_experience])
    city = IntegerField('city',validators=[DataRequired()])
    price = DecimalField('price',validators=[DataRequired(message=PRICE_ERROR),check_price])
