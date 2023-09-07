from app.models import db, environment, SCHEMA
from .users import users, User
from .projects import projects, Project
from sqlalchemy.sql import text
from datetime import datetime
from random import randint, choice

def fake_saves(projects, users):
    # test_user = User(
    #     username = "testuser",
    #     email = "test@email.com",
    #     password = "password"
    # )
    # test_project = Project(
    #     creator_id = 1,
    #     category_id = 1,
    #     title = "Test",
    #     description = "",
    #     story = "",
    #     faq = "",
    #     project_image = "/image/banner/fake.png",
    #     start_date = datetime(2023, 8, 20),
    #     end_date = datetime(2024, 1, 20),
    #     funding_goal = 7000,
    #     location = "San Francisco, CA"
    # )
    # test_user.saves.append(test_project)
    # db.session.add(test_user)
    # db.session.add(test_project)
    # saves = []
    # users[0].saves.append(projects[12])
    # users[0].saves.append(projects[13])
    # users[1].saves.append(projects[14])
    # users[0].saves = [projects[12].id]
    for user in users:
      saved_num = randint(1, 3)
      saves = []
      for i in range(1, saved_num + 1):
          project = choice(projects)
          if project.creator_id == user.id:
              project = choice(projects)
          saves.append(project)
      user.saves = saves

    return users


def seed_saves():
    saves = fake_saves(projects, users)
    # print('users -----', users[0])
    # print('project creator id ---', project)
    # user.saves = saves
    # print('user saves ---', user.saves)

    db.session.commit()




def undo_saves():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_saves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_saves"))

    db.session.commit()
