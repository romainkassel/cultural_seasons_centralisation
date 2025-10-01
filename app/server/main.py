from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select, Relationship

class EventCityLink(SQLModel, table=True):
    event_id: int | None = Field(default=None, foreign_key="event.id", primary_key=True)
    city_id: int | None = Field(default=None, foreign_key="city.id", primary_key=True)

class EventBase(SQLModel):
    title: str
    category: str
    description: str
    duration: str

class EventCreate(EventBase):
    city: str

class EventRead(EventBase):
    cities: list[str]

class Event(EventBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    cities: list["City"] = Relationship(back_populates="events", link_model=EventCityLink)

class CityBase(SQLModel):
    name: str

class CityRead(CityBase):
    events: list[Event] = []

class City(CityBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    events: list["Event"] = Relationship(back_populates="cities", link_model=EventCityLink)

psql_url = "postgresql://rkassel@localhost:5432/db-progra-cultu"

engine = create_engine(psql_url, echo=True)

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/event")
async def create_event(data: EventCreate):
    print("data: ", data)
    with Session(engine) as session:
        city = session.exec(select(City).where(City.name == data.city)).one()
        event = Event(
            title=data.title,
            category=data.category,
            description=data.description,
            duration=data.duration,
            cities=[city]
        )
        session.add(event)
        session.commit()
        session.refresh(event)
        return event

@app.get("/events", response_model=list[EventRead])
async def get_events():
    with Session(engine) as session:
        events = session.exec(select(Event)).all()
        eventsRead: list[EventRead] = []
        for event in events:
            eventsRead.append(
                EventRead(
                    title=event.title,
                    category=event.category,
                    description=event.description,
                    duration=event.duration,
                    cities=[city.name for city in event.cities if city]
                )
            )
        return eventsRead

@app.post("/city")
async def create_city(city: City):
    with Session(engine) as session:
        session.add(city)
        session.commit()
        session.refresh(city)
        return city

@app.get("/cities", response_model=list[CityRead])
async def get_cities():
    with Session(engine) as session:
        cities = session.exec(select(City)).all()
        citiesRead: list[CityRead] = []
        for city in cities:
            citiesRead.append(
                CityRead(
                    name=city.name,
                    events=[event for event in city.events if event]
                )
            )
        return citiesRead

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def create_city():
    city = City(name="Montreuil")
    session = Session(engine)
    session.add(city)
    session.commit()
    session.close()
    
def main():
    create_db_and_tables()
    create_city()

if __name__ == "__main__":
    main()