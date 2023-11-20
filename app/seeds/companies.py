from app.models import db, Company, environment, SCHEMA
from sqlalchemy.sql import text


# Adds seed companies, you can add other companies here if you want
def seed_companies():
    apple = Company(
        name='Apple', symbol='AAPL', price=189.95, about='Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other varieties of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific.')
    tesla = Company(
        name='Tesla', symbol='TSLA', price=233.77, about="Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles and energy generation and storage systems. The company operates through the following segments: Automotive and Energy Generation and Storage.")
    microsoft = Company(
        name='Microsoft', symbol='MSFT', price=367.49, about='Microsoft Corp. engages in the development and support of software, services, devices, and solutions. It operates through the following business segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.')
    amazon = Company(
        name='Amazon', symbol='AMZN', price=145.37, about='Amazon.com, Inc. is a multinational technology company, which engages in the provision of online retail shopping services. It operates through the following segments: North America, International, and Amazon Web Services (AWS)')
    gamestop = Company(
        name='Gamestop', symbol='GME', price=13.02, about='GameStop Corp. offers games and entertainment products through its ecommerce properties and stores. It operates through the following geographic segments: United States, Canada, Australia, and Europe.')
    netflix = Company(
        name='Netflix', symbol='NFLX', price=465.88, about='Netflix, Inc. engages in providing entertainment services. It also offers a broad set of activities for leisure time, entertainment video, video gaming, and other sources of entertainment.')
    ferrari = Company(
        name='Ferrari', symbol='RACE', price=360.69, about="Ferrari NV is a holding company, which engages in the design, engineering, production, and sale of luxury sports cars. The firm's models include the F12Berlinetta, 488GTB, 488 Spider, 458 Speciale, California T, the LaFerrari Hybrid, LaFerrari, and the FF four-wheel drive. It participates in car racing such as Formula One. The company was founded by Enzo Anselmo Ferrari in 1939 and is headquartered in Maranello, Italy. The listed name for RACE is Ferrari N.V.")

    db.session.add(apple)
    db.session.add(tesla)
    db.session.add(microsoft)
    db.session.add(gamestop)
    db.session.add(amazon)
    db.session.add(netflix)
    db.session.add(ferrari)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_companies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM companies"))

    db.session.commit()
