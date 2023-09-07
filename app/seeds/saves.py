from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text

# def seed_likes():


# def undo_likes():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.user_saves RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM user_saves"))

#     db.session.commit()
