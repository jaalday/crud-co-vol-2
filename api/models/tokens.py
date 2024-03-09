from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from config import settings
from sqlalchemy import Column, String, Integer, DateTime, func
from models.base import Base
import jwt

class BlackListedToken(Base):
    __tablename__ = 'blacklisted_tokens'
    id=Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    token = Column(String)
    
    def __repr__(self):
        return f"<BlackListedToken(id={self.id}, created_at={self.created_at})>"
    

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
    
class TokenData(BaseModel):
    email: str | None = None
    
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta  
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")  
    return encoded_jwt