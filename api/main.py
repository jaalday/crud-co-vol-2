from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db_connect import session
from models.links import Links
from models.links import LinksSchema
from models.users import User
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8000",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*,"],
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
    



@app.post('/links/add')
async def create_user(url_data: LinksSchema):
    # user = User_data(title=user_data.title, original_url=user_data.original_url, short_url=user_data.short_url)
    link = Links( user_id=url_data.user_id, title=url_data.title, original_url= url_data.original_url, short_url=url_data.short_url)
    
    session.add(link)
    session.commit()
    return{"user added": link.user_id}

