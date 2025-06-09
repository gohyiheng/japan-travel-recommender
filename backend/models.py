from sqlalchemy import Column, Integer, String, Float
from db import Base

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
