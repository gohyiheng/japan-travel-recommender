from sqlalchemy import Column, Integer, String, Float
from db import Base
# uses japan_cities_geo_rec
class City(Base):
    __tablename__ = "cities"

    Id = Column(Integer, primary_key=True, index=True)
    region = Column(String)
    prefecture = Column(String)
    city = Column(String)
    link = Column(String)
    description = Column(String)
    rating = Column(Float)
    visits = Column(Integer)
    recommendation = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    rating_normalized = Column(Float)
    visits_normalized = Column(Float)
    balanced_score = Column(Float)
    popular_score = Column(Float)
    hidden_gem_score = Column(Float)