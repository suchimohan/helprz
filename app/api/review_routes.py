from flask import Blueprint, request
from app.models import db, Review
from app.forms import ReviewForm
from flask_login import login_required, current_user

review_routes = Blueprint('review', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@review_routes.route('/<int:tasker_id>', methods=['GET'])
def get_review(tasker_id):
  results = Review.query.filter(Review.taskerId == tasker_id).all()
  if results:
    reviews = {review.id: review.to_dict() for review in results}
    return reviews
  else:
    return {'message': 'Reviews not found'}



@review_routes.route('/new', methods=['POST'])
def create_review():
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review = Review(
      userId = int(form.data['userId']),
      taskerId = int(form.data['taskerId']),
      content = form.data['content'],
      rating = form.data['rating'],
    )
    db.session.add(review)
    db.session.commit()
    return review.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    currentUser = current_user.to_dict()
    if currentUser['id'] == review.userId:
      db.session.delete(review)
      db.session.commit()
      return "204"
    else:
      return "401"


@review_routes.route('/<int:id>/edit', methods=['PUT'])
def review_edit(id):
    review = Review.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      review.userId = form.data['userId']
      review.taskerId = form.data['taskerId']
      review.content = form.data['content']
      review.rating = form.data['rating']
      db.session.commit()
      return review.to_dict()
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# @review_routes.route('/<int:id>', methods=['GET'])
# def one_review(id):
#   results = Review.query.get(id)
#   return results
