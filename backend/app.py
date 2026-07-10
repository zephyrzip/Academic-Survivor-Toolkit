from fastapi import FastAPI
from backend.database.database import load_data, save_data, get_section, update_section, reset_database
from backend.routes.countdowns import router as countdowns_router
from backend.routes.courses import router as courses_router
from backend.routes.planners import router as planners_router
from backend.routes.settings import router as settings_router

app = FastAPI(
    title="Academic Survivor Toolkit",
    version="0.1.0"
)

app.include_router(courses_router)
app.include_router(countdowns_router)
app.include_router(planners_router)
app.include_router(settings_router)

@app.get("/")
def home():
    return {
        "status": "running",
        "project": "Academic Survivor Toolkit"
    }