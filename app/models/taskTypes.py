from .db import db
from sqlalchemy.sql import func

class TaskType(db.Model):
    __tablename__ = 'taskTypes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False, unique=True)
    taskImageURL = db.Column(db.String(500),nullable=False)
    avgPrice = db.Column(db.Integer,nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {
            'id' : self.id,
            'name': self.name,
            'taskImageURL': self.taskImageURL,
            'avgPrice': self.avgPrice,
            'created_at': self.created_at,
            'updated_at' : self.updated_at
        }
