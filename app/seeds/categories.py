from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
  arts = Category(
    name = "Arts",
    description = "Discover the artists and organizations using Kickstarter to realize ambitious projects in visual art and performance."
  )
  comics = Category(
    name = "Comics & Illustration",
    description = "Explore fantastical worlds and original characters from Kickstarter's community of comics creators and illustrators."
  )
  design = Category(
    name = "Design & Tech",
    description = "From fine design to innovative tech, discover projects from creators working to build a more beautiful future."
  )
  film = Category(
    name = "Film",
    description = "Join forces with the intrepid filmmakers and festival creators changing the way stories get told on screen."
  )
  food = Category(
    name = "Food & Craft",
    description = "See how artisans and entrepreneurs are using Kickstarter to break new ground in food, fashion, and crafts."
  )
  games = Category(
    name = "Games",
    description = "From tabletop adventures to beloved revivals, discover the projects forging the future of gameplay."
  )
  music = Category(
    name = "Music",
    description = "Discover new albums, performances, and independent venues from creators using Kickstarter to shape the future of sound."
  )
  publishing = Category(
    name = "Publishing",
    description = "Explore how writers and publishers are using Kickstarter to bring new literature, periodicals, podcasts, and more to life."
  )

  all_categories = [arts, comics, design, film, food, games, music, publishing]
  _ = [db.session.add(category) for category in all_categories]
  db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
