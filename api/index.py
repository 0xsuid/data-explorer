import json
from fastapi import FastAPI, Request
from strawberry.asgi import GraphQL
from strawberry.fastapi import GraphQLRouter
from fastapi.middleware.cors import CORSMiddleware


from api.schema import schema

graphql_app = GraphQLRouter(schema)

app = FastAPI()

origins = [
    "https://carbonminds.vercel.app",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(graphql_app, prefix="/api")

@app.get("/api/test")
async def root():
    return {"message": "Meowww!"}