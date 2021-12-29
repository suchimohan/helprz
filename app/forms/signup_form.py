from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError,URL,Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    if len(username) < 3 or len(username) > 40:
        raise ValidationError('Username should be of length 3 - 40.')
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def match_password(form,field):
    #checking if confirm password matches with password"
    password = form.data['password']
    confirm = field.data
    if password != confirm:
        raise ValidationError('Password should match with Confirm Password')

def check_password(form,field):
    password = field.data
    if len(password) < 8 or len(password) > 30:
        raise ValidationError('Password should be of length 8 - 30.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(),Email(),user_exists])
    image = StringField('image',validators=[DataRequired(),URL()])
    password = StringField('password',validators=[DataRequired(),check_password])
    confirm = StringField('confirm', validators=[DataRequired(),match_password])
