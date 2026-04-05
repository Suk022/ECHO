"""
ECHO Article Preview API

Entry point for the FastAPI application.
Mounts the articles router and configures CORS for local frontend access.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from articles import router as articles_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="ECHO Article Preview API",
    description="Resolves shortened URLs and extracts OG metadata for article preview cards.",
    version="1.0.0",
)

origins = [
    "http://127.0.0.1:5500",
    os.getenv("FRONTEND_URL")
]


# Allow requests from deployed frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(articles_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
