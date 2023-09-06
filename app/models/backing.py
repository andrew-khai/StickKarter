from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Backing(db.Model):
  __tablename__ = 'backings'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')))
  reward_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('rewards.id')))
  amount_pledged = db.Column(db.Float(), nullable=False)
  created_at = db.Column(db.TIMESTAMP(), nullable=False, default=datetime.now())

  # Relationships
  user = db.relationship("User", back_populates="backings")
  project = db.relationship("Project", back_populates="backings")
  rewards = db.relationship("Reward", back_populates="backing")
