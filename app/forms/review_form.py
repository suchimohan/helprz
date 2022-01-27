from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Review

RATING_ERROR = 'Rating must be between 1-5'

def check_rating(form,field):
    rating = field.data
    if rating < 1 or rating > 5:
        raise ValidationError(RATING_ERROR)

class ReviewForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    taskerId = IntegerField('taskerId', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(message=RATING_ERROR),check_rating])
