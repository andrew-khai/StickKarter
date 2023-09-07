from app.models import db, Reward, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rewards():
  reward1 = Reward(
    title = "Meme Piece",
    description = "A portrait of a meme of your choice.",
    price = 50,
  )
  reward2 = Reward(
    title = "Comic Book Mug",
    description = "You'll get create your comic book mug.",
    price = 20,
  )
  reward3 = Reward(
    title = "Signed Copy",
    description = "Recieve a signed copy of the book.",
    price = 15,
  )
  reward4 = Reward(
    title = "Signed Album",
    description = "Recieve a signed copy of the album.",
    price = 20,
  )
  reward5 = Reward(
    title = "Limited Edition Mat",
    description = "Recieve a limited edition Star Wars Guess Who mat.",
    price = 50,
  )
  reward6 = Reward(
    title = "VR Decals",
    description = "Spice up your VR set with our limited edition decals.",
    price = 15,
  )
  reward7 = Reward(
    title = "Sweater",
    description = "You will recieve your very highly coveted Ekin sweater.",
    price = 50,
  )
  reward8 = Reward(
    title = "Scarf Bonus",
    description = "You will recieve 2 scarves.",
    price = 45,
  )
  reward9 = Reward(
    title = "MiniLens",
    description = "You will recieve a MiniLens replica of the SuperLens.",
    price = 25,
  )
  reward10 = Reward(
    title = "Digital Copy",
    description = "Once the film has been made, you will recieve a special edition digital copy.",
    price = 50,
  )
  reward11 = Reward(
    title = "Pre-Order Sci Fi Pen",
    description = "You will recieve early bird benefits for the Sci Fi Pen.",
    price = 30,
  )
  reward12 = Reward(
    title = "Water Bottle",
    description = "Recieve an 24.oz Alcoholic? Water Bottle.",
    price = 40,
  )
  reward13 = Reward(
    title = "Recipe Book",
    description = "You will recieve a recipe book for the meat bread.",
    price = 35,
  )
  reward14 = Reward(
    title = "Signed CD",
    description = "Recieve a signed CD from the very well known creator.",
    price = 30,
  )
  reward15 = Reward(
    title = "Early Bird",
    description = "Be the first to get a copy of Just the Man.",
    price = 30,
  )
  reward16 = Reward(
    title = "5 Pieces",
    description = "If you choose this reward you will recieve 4 custom pieces and 1 of your own choosing.",
    price = 100,
  )
  reward17 = Reward(
    title = "Custom Headband",
    description = "At this reward you will also recieve the sweater and pure cotton headband.",
    price = 75,
  )
  reward18 = Reward(
    title = "Magazine",
    description = "In addition to the MiniLens you will also recieve a 6 month subscription to a magazine with amazing picutres.",
    price = 50,
  )
  reward19 = Reward(
    title = "Engraving",
    description = "You will get a custom engraving on your Sci Fi Pencil.",
    price = 40,
  )
  reward20 = Reward(
    title = "Towel",
    description = "You will recieve a custom towel in addition to your decals.",
    price = 25,
  )

  all_rewards = [reward1, reward2, reward3, reward4, reward5, reward6, reward7, reward8, reward9, reward9, reward10, reward11, reward12, reward13, reward14, reward15, reward16, reward17, reward18, reward19, reward20]
  _ = [db.session.add(reward) for reward in all_rewards]
  db.session.commit()

def undo_rewards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rewards"))

    db.session.commit()
