from .db import db, environment, SCHEMA, add_prefix_for_prod

saves = db.Table(
  'user_saves',
  db.Model.metadata,
  db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
  db.Column("projects", db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), primary_key=True)
)

if environment == "production":
    saves.schema = SCHEMA
