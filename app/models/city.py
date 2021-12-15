from .db import db
from sqlalchemy.sql import func

class City(db.Model):
    __tablename__ = 'cities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    taskers = db.relationship("Tasker", back_populates="city")
    tasks = db.relationship("Task", back_populates="city")

    def to_dict(self):
        return {
            'id' : self.id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at' : self.updated_at
        }
