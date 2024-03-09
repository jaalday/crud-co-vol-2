from fastapi import FastAPI, HTTPException, status, Query, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from db_connect import session
from models.links import Links
from models.links import LinksSchema
from models.users import User, UserSchema,  UserAccountSchema
from models.tokens import Token, TokenData, create_access_token, BlackListedToken
from db_connect import engine, session
from models.base import Base
from config import settings
from services import create_user, get_user_data
from datetime import date, timedelta
from starlette.responses import RedirectResponse
from sqlalchemy.exc import IntegrityError


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

import jwt

def create_tables():
    Base.metadata.create_all(bind=engine)
    
def start_app():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    create_tables()
    return app
    

app = start_app()

origins = [
    "http://localhost/*",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return{"message" : "Root route"}

@app.get('/links')
def get_data():
    id = session.query(Links)
    return id.all()

@app.get('/users')
def get_user():
    user_id = session.query(User)
    return user_id.all()



@app.post('/users/add', response_model=UserSchema)
def register_user(payload: UserAccountSchema):
    payload.hashed_password = User.hash_password(payload.hashed_password)
    return create_user(user=payload)




@app.post('/login')
async def login(payload: UserAccountSchema):
    try:
        user: User = get_user_data(email=payload.email)
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail = "invalid user credentials",
        )
    is_validated: bool = user.validate_password(payload.hashed_password)
    
    if not is_validated:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user credentials"
        )
    access_token_expires = timedelta(minutes=120) 
    access_token = create_access_token(
        data={"email": user.email}, expires_delta=access_token_expires
    )   
    return Token(access_token=access_token, token_type="bearer")
        
@app.get('/sendit')
async def redirect_to_ecternal_url(url: str = Query(...)):
    link = session.query(Links).filter(Links.short_url == url).first()
    
    long_url = f"http://{link.original_url}"
    
    return RedirectResponse(long_url)
                                

# @app.post('/users/add')
# async def create_users(user_data: UserSchema):
#     user = User(email=user_data.email,)
#     session.add(user)
#     session.commit()
#     return{"user added": user.email}
    
@app.get('/logout', status_code=200)
def logout(token: Token = Depends(oauth2_scheme)):
    try:
        token = BlackListedToken(token=token)
        session.add(token)
        session.commit()
    except IntegrityError as e:
        raise settings.CREDENTIALS_EXCEPTION
    return{"details": "Logged out"}


@app.post('/links/add')
async def create_link(url_data: LinksSchema):
    # user = User_data(title=user_data.title, original_url=user_data.original_url, short_url=user_data.short_url)
    # link = Links( user_id=url_data.user_id, title=url_data.title, original_url= url_data.original_url, short_url=url_data.short_url)
    link = Links(**url_data.model_dump())
    session.add(link)
    session.commit()
    return{"link added": link.user_id}

