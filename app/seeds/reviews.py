from app.models import db, Review


def seed_reviews():
    for i in range(1,167):
        review1 = Review(
            userId=1, taskerId = i, content="Good Job,satisfied", rating=5)
        db.session.add(review1)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
