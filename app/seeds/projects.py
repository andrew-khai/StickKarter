from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint

month = randint(1, 12)
day = randint(1, 28)

def get_projects():
  proj1 = Project(
    creator_id = 1,
    category_id = 1,
    title = "MemeCasso Exhibit",
    description = "Ever want to see an art exhibit full of Memes? Well we can help you with MemeCasso.",
    story = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    faq = "Q: How long does it take for a meme to become art? A: Our artists are one of a kind, so it may vary from 1-2 weeks.",
    project_image = "/images/banner/memes.png",
    start_date = datetime(2023, 3, 15),
    end_date = datetime(2024, month, day),
    funding_goal = 7500,
    location = "San Francisco, CA",
    created_at = datetime(2023, 3, 15),
  )
  proj2 = Project(
    creator_id = 1,
    category_id = 2,
    title = "Create Your Comic",
    description = "Here is your chance to be your own comic book superhero. With this you will be able to make any comic book you want.",
    story = "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    faq = "Q: When will the comic come out? A: It'll come out in a few months",
    project_image = "/images/banner/comicbook.jpg",
    start_date = datetime(2023, 4, 1),
    end_date = datetime(2024, month, day),
    funding_goal = 10000,
    location = "Las Vegas, NV",
    created_at = datetime(2023, 4, 1)
  )
  proj3 = Project(
    creator_id = 2,
    category_id = 8,
    title = "Dog v. Cat",
    description = "Help us get this children's book out to the world. Fun adventures for dogs and cats.",
    story = "Loren ipsum is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    faq = "",
    project_image = "/images/banner/catvdog.jpeg",
    start_date = datetime(2023, 4, 5),
    end_date = datetime(2024, month, day),
    funding_goal = 5000,
    location = "Topeka, KS",
    created_at = datetime(2023, 4, 5)
  )
  proj4 = Project(
    creator_id = 2,
    category_id = 7,
    title = "FakeAlbum",
    description = "This is not a real album. But will it have real songs? No probably not",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "Q: Will there be songs? A: Nope",
    project_image = "/images/banner/fakealbum.png",
    start_date = datetime(2023, 5, 10),
    end_date = datetime(2024, month, day),
    funding_goal = 500,
    location = "Los Angeles, CA",
    created_at = datetime(2023, 5, 10)
  )
  proj5 = Project(
    creator_id = 3,
    category_id = 6,
    title = "Star Wars Guess Who",
    description = "A Guess Who game...but with STAR WARS",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "",
    project_image = "/images/banner/guesswho.jpg",
    start_date = datetime(2023, 4, 4),
    end_date = datetime(2024, month, day),
    funding_goal = 5040,
    location = "Boston, MA",
    created_at = datetime(2023, 4, 4)
  )
  proj6 = Project(
    creator_id = 4,
    category_id = 6,
    title = "VR Life",
    description = "Just your life, but in VR. Be careful as to not forget that you are in VR while playing...",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "Q: Is this dangerous? A: Maybe, but that's up to you guys, we aren't liable",
    project_image = "/images/banner/vrlife.png",
    start_date = datetime(2023, 4, 20),
    end_date = datetime(2024, month, day),
    funding_goal = 9000,
    location = "Seattle, WA",
    created_at = datetime(2023, 4, 20)
  )
  proj7 = Project(
    creator_id = 5,
    category_id = 5,
    title = "Not Nike Fleece",
    description = "Definitely not Nike Fleece, may look very similar but not at all...",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "",
    project_image = "/images/banner/ekin.jpg",
    start_date = datetime(2023, 5, 17),
    end_date = datetime(2024, month, day),
    funding_goal = 3500,
    location = "Portland, OR",
    created_at = datetime(2023, 5, 17)
  )
  proj8 = Project(
    creator_id = 6,
    category_id = 5,
    title = "Dragon Scarf",
    description = "A nice scarf made of pure cotton that looks like beautiful dragon scales.",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "Q: What colors do they come in? A: We have just the one so far",
    project_image = "/images/banner/dragonscarf.jpeg",
    start_date = datetime(2023, 5, 20),
    end_date = datetime(2024, month, day),
    funding_goal = 10000,
    location = "Austin, TX",
    created_at = datetime(2023, 5, 20)
  )
  proj9 = Project(
    creator_id = 7,
    category_id = 3,
    title = "SuperLens",
    description = "The biggest camera lens ever made. Really clear sights",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "Q: How far can you see? A: You can see a decent amount",
    project_image = "/images/banner/superlens.jpeg",
    start_date = datetime(2023, 4, 21),
    end_date = datetime(2024, month, day),
    funding_goal = 20000,
    location = "New York City, NY",
    created_at = datetime(2023, 4, 21)
  )
  proj10 = Project(
    creator_id = 7,
    category_id = 4,
    title = "WWMoo",
    description = "The cows attack, in this horror/thriller picture where cows try to conquer the world...",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "",
    project_image = "/images/banner/cowwars.jpeg",
    start_date = datetime(2023, 5, 11),
    end_date = datetime(2024, month, day),
    funding_goal = 25000,
    location = "Montgomery, AL",
    created_at = datetime(2023, 5, 11)
  )
  proj11 = Project(
    creator_id = 8,
    category_id = 1,
    title = "Sci Fi Pencil",
    description = "This futuristic pencil will do wonders. Always sharpened, and never runs out",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "",
    project_image = "/images/banner/scifipencil.jpeg",
    start_date = datetime(2023, 7, 11),
    end_date = datetime(2024, month, day),
    funding_goal = 50000,
    location = "Los Angeles, CA",
    created_at = datetime(2023, 7, 11)
  )
  proj12 = Project(
    creator_id = 8,
    category_id = 5,
    title = "Alcoholic Water",
    description = "It is what it is. Just some alcoholic water for those that want alcohol in their water. Drink responsibly!",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "Q: How much alcohol is in it? A: Just a little bit",
    project_image = "/images/banner/water.jpeg",
    start_date = datetime(2023, 7, 7),
    end_date = datetime(2024, month, day),
    funding_goal = 12000,
    location = "Los Angeles, CA",
    created_at = datetime(2023, 7, 7)
  )
  proj13 = Project(
    creator_id = 9,
    category_id = 5,
    title = "Meat Bread",
    description = "It's meat but shaped like bread. Still tastes good.",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "",
    project_image = "/images/banner/meatbread.jpeg",
    start_date = datetime(2023, 6, 10),
    end_date = datetime(2024, month, day),
    funding_goal = 4000,
    location = "Dallas, TX",
    created_at = datetime(2023, 6, 10)
  )
  proj14 = Project(
    creator_id = 9,
    category_id = 7,
    title = "ABC song",
    description = "A new ABC song to teach your kids or anyone the alphabet.",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "",
    project_image = "/images/banner/abcsong/jpeg",
    start_date = datetime(2023, 8, 1),
    end_date = datetime(2024, month, day),
    funding_goal = 10000,
    location = "Aliso Viejo, CA",
    created_at = datetime(2023, 8, 1)
  )
  proj15 = Project(
    creator_id = 10,
    category_id = 2,
    title = "Just the Man",
    description = "This is a comic book about the daily life of a man. Just beautifully drawn comic strips with a wholesome story.",
    story = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    faq = "",
    project_image = "/images/banner/indie.jpeg",
    start_date = datetime(2023, 8, 20),
    end_date = datetime(2024, month, day),
    funding_goal = 7000,
    location = "San Francisco, CA",
    created_at = datetime(2023, 8, 1)
  )
  all_projects = [proj1, proj2, proj3, proj4, proj5, proj6, proj7, proj8, proj9, proj10, proj11, proj12, proj13, proj14, proj15]
  return all_projects

projects = get_projects()

def seed_projects():
  all_projects = get_projects()
  _ = [db.session.add(project) for project in all_projects]
  db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
