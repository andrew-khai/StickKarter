from app.models import db, Backing, environment, SCHEMA
from sqlalchemy.sql import text

def seed_backings():
  back1 = Backing(
    user_id = 1,
    project_id = 3,
    reward_id = 3,
    amount_pledged = 20,
  )
  back2 = Backing(
    user_id = 1,
    project_id = 4,
    reward_id = 4,
    amount_pledged = 20,
  )
  back3 = Backing(
    user_id = 2,
    project_id = 1,
    reward_id = 1,
    amount_pledged = 50,
  )
  back4 = Backing(
    user_id = 3,
    project_id = 2,
    reward_id = 2,
    amount_pledged = 20,
  )
  back5 = Backing(
    user_id = 4,
    project_id = 5,
    reward_id = 5,
    amount_pledged = 50,
  )
  back6 = Backing(
    user_id = 4,
    project_id = 7,
    reward_id = 7,
    amount_pledged = 50,
  )
  back7 = Backing(
    user_id = 5,
    project_id = 6,
    reward_id = 6,
    amount_pledged = 15,
  )
  back8 = Backing(
    user_id = 5,
    project_id = 8,
    reward_id = 8,
    amount_pledged = 45,
  )
  back9 = Backing(
    user_id = 6,
    project_id = 9,
    reward_id = 9,
    amount_pledged = 25,
  )
  back10 = Backing(
    user_id = 6,
    project_id = 10,
    reward_id = 10,
    amount_pledged = 50,
  )
  back11 = Backing(
    user_id = 7,
    project_id = 11,
    reward_id = 11,
    amount_pledged = 30,
  )
  back12 = Backing(
    user_id = 8,
    project_id = 13,
    reward_id = 13,
    amount_pledged = 35,
  )
  back13 = Backing(
    user_id = 9,
    project_id = 12,
    reward_id = 12,
    amount_pledged = 40,
  )
  back14 = Backing(
    user_id = 9,
    project_id = 15,
    reward_id = 15,
    amount_pledged = 30,
  )
  back15 = Backing(
    user_id = 10,
    project_id = 14,
    reward_id = 14,
    amount_pledged = 30,
  )

  all_backings = [back1, back2, back3, back4, back5, back6, back7, back8, back9, back10, back11, back12, back13, back14, back15]
  _ = [db.session.add(backing) for backing in all_backings]
  db.session.commit()

def undo_backings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.backings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM backings"))

    db.session.commit()
