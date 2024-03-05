from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column
from models.base import Base
from db_connect import engine
from pydantic import BaseModel



# links...i misnamed
class Links(Base):
    __tablename__ = "links"
    
    id = Column(Integer, primary_key=True)
    user_id = mapped_column(ForeignKey("users.id"))
    title = Column(String)
    original_url = Column(String)
    short_url = Column(String)
    
class LinksSchema(BaseModel):
    user_id: int
    title : str
    original_url: str
    short_url: str   
    
class Config:
    populate_by_name = True
    
    
    
    
    
    # Base.metadata.create_all(engine)