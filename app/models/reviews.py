from .db import db
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    taskerId = db.Column(db.Integer, db.ForeignKey("taskers.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    user = db.relationship("User", back_populates="reviews")
    tasker = db.relationship("Tasker",back_populates="reviews")


    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'taskerId': self.taskerId,
            'content': self.content,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
