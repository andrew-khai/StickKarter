from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', bio='Welcome to Demo User', email='demo@aa.io', password='password')
    marnie = User(
        username='Marnie', bio='Hi, my name is Marnie please help', email='marnie@aa.io', password='password')
    bobbie = User(
        username='Bobbie', bio='Hi, my name is Bobbie please help', email='bobbie@aa.io', password='password')
    games_corp = User(
        username='GamesCorp', bio='We are GamesCorp, a company set to make some really awesome games', email='gamescorp@demo.io', password='password1'
    )
    ekin = User(
        username='Ekin', bio='Totally not Nike, we are Ekin, not Nike at all...', email='ekin@demo.io', password='password2'
    )
    new_fashion = User(
        username='NewFash', bio='NewFash, is a fashion company looking to set new trends!', email='gamescorp@demo.io', password='password3'
    )
    nice_films = User(
        username='niceFilms', bio='Hello there! niceFilms is a company looking to make movie dreams come true!', email='gamescorp@demo.io', password='password4'
    )
    albert = User(
        username='Albert', bio='Hi, my name is Albert please help', email='gamescorp@demo.io', password='password5'
    )
    francis = User(
        username='Francis', bio='Hi, my name is Francis please help', email='gamescorp@demo.io', password='password6'
    )
    lisa = User(
        username='Lisa', bio='Hi, my name is Lisa please help', email='gamescorp@demo.io', password='password8'
    )

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.add(games_corp)
    # db.session.add(ekin)
    # db.session.add(new_fashion)
    # db.session.add(nice_films)
    # db.session.add(albert)
    # db.session.add(francis)
    # db.session.add(ernest)
    # db.session.add(lisa)
    all_users = [demo, marnie, bobbie, games_corp, ekin, new_fashion, nice_films, albert, francis, lisa]
    _ =[db.session.add(user) for user in all_users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
