from fastapi import FastAPI, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from db import SessionLocal, engine
from models import Base, City
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()

# set up to allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/cities")
        # {region, link, prefecture, rating, visits, longitude, city, Id, description, recommendation, latitude} 
def read_cities(db: Session = Depends(get_db)):
    query = text("SELECT city, prefecture, region, hidden_gem_score, popular_score, rating, visits, link FROM cities")
    result = db.execute(query)
    cities = [dict(row._mapping) for row in result]  # SQLAlchemy 1.4+
    return cities