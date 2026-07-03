from fastapi import FastAPI
from backend.database.database import load_data, save_data, get_section, update_section, reset_database


app = FastAPI()

@app.get("/")
def home():
    return {
        "status": "running",
        "project": "Academic Survivor Toolkit"
    }