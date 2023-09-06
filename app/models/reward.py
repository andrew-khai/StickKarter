from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reward(db.Model):
  __tablename__ = 'rewards'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(60), nullable=False)
  description = db.Column(db.Text(), nullable=False)
  price = db.Column(db.Float(), nullable=False)
  created_at = db.Column(db.TIMESTAMP(), nullable=False, default=datetime.now())

  # Relationships
  project = db.relationship("Project", back_populates="rewards")
