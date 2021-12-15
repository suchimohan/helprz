from .db import db
from sqlalchemy.sql import func

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    requestUserId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    taskerId = db.Column(db.Integer, db.ForeignKey("taskers.id"), nullable=False)
    citiesId = db.Column(db.Integer, db.ForeignKey("cities.id"), nullable=False)
    taskTypesId = db.Column(db.Integer, db.ForeignKey("taskTypes.id"), nullable=False)
    dateTime = db.Column(db.DateTime, nullable=False)
    taskDescription = db.Column(db.Text, nullable=False)
    duration = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship( "User", back_populates="tasks")
    tasker = db.relationship("Tasker",back_populates="tasks")
    taskType = db.relationship("TaskType", back_populates="tasks")
    city = db.relationship("City", back_populates="tasks")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'tasker': self.tasker.to_dict(),
            'city': self.city.to_dict(),
            'taskType': self.taskType.to_dict(),
            'dateTime': self.dateTime,
            'taskDescription': self.taskDescription,
            'duration': self.duration,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
