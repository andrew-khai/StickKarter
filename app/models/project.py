from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Project(db.Model):
  __tablename__ = "projects"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')))
  title = db.Column(db.String(60), nullable=False)
  description = db.Column(db.Text())
  story = db.Column(db.Text())
  faq = db.Column(db.Text())
  project_image = db.Column(db.String(255), nullable=False)
  start_date = db.Column(db.Date(), nullable=False)
  end_date = db.Column(db.Date(), nullable = False)
  funding_goal = db.Column(db.Float(), nullable=False)
  location = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.TIMESTAMP(), nullable=False, default=datetime.now())

  # Relationships
  user = db.relationship("User", back_populates="projects")
  backings = db.relationship("Backing", back_populates="project")
  category = db.relationship("Category", back_populates="project")
  rewards = db.relationship("Reward", back_populates="project")
  saves = db.relationship(
    "User",
    secondary="user_saves",
    back_populates="saves"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "creatorId": self.creator_id,
      "catergoryId": self.category_id,
      "title": self.title,
      "description": self.description,
      "story": self.story,
      "faq": self.faq,
      "projectImage": self.project_image,
      "startDate": self.start_date,
      "endDate": self.end_date,
      "fundingGoal": self.funding_goal,
      "location": self.location,
      "createdAt": self.created_at
    }

  def to_dict_summary(self):
    return {
      "id": self.id,
      "creatorId": self.creator_id,
      "catergoryId": self.category_id,
      "title": self.title,
      "description": self.description,
      "story": self.story,
      "faq": self.faq,
      "projectImage": self.project_image,
      "startDate": self.start_date,
      "endDate": self.end_date,
      "fundingGoal": self.funding_goal,
      "location": self.location,
      "createdAt": self.created_at,
      "backings": [backing.to_dict() for backing in self.backings],
      "rewards": [reward.to_dict() for reward in self.rewards]
    }
