from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db_connect import session
from models.links import Links
from models.links import LinksSchema
from models.users import User, UserSchema,  UserAccountSchema
from db_connect import engine, session
from models.base import Base
from config import settings
from services import create_user, get_user_data

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
        


# @app.post('/users/add')
# async def create_users(user_data: UserSchema):
#     user = User(email=user_data.email,)
#     session.add(user)
#     session.commit()
#     return{"user added": user.email}
    



@app.post('/links/add')
async def create_link(url_data: LinksSchema):
    # user = User_data(title=user_data.title, original_url=user_data.original_url, short_url=user_data.short_url)
    # link = Links( user_id=url_data.user_id, title=url_data.title, original_url= url_data.original_url, short_url=url_data.short_url)
    link = Links(**url_data.model_dump())
    session.add(link)
    session.commit()
    return{"link added": link.user_id}

