from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Review


class ReviewForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    taskerId = IntegerField('taskerId', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(), NumberRange(min=1, max=5, message='rating must be 1-5')])
