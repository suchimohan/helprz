from .db import db
from sqlalchemy.sql import func


class Tasker(db.Model):
    __tablename__ = 'taskers'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    taskTypesId = db.Column(db.Integer, db.ForeignKey("taskTypes.id"), nullable=False)
    citiesId = db.Column(db.Integer, db.ForeignKey("cities.id"), nullable=False)
    description = db.Column(db.Text, nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship( "User", back_populates="tasker")
    taskType = db.relationship("TaskType", back_populates="taskers")
    city = db.relationship("City", back_populates="taskers")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'taskTypesId': self.taskTypesId,
            'citiesId': self.citiesId,
            'description': self.description,
            'experience': self.experience,
            'price': float(self.price),
            'created_at': self.created_at,
            'updated_at': self.updated_at
      }
