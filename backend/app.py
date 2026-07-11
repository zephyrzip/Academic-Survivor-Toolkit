from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from backend.database.database import load_data, save_data, get_section, update_section, reset_database
from backend.routes.countdowns import router as countdowns_router
from backend.routes.courses import router as courses_router
from backend.routes.planners import router as planners_router
from backend.routes.settings import router as settings_router
from backend.routes.assignments import router as assignments_router
from backend.gpa.routes import router as gpa_router
from backend.routes.attendances import router as attendance_router

app = FastAPI(
    title="Academic Survivor Toolkit",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace "*" with your actual frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(courses_router)
app.include_router(countdowns_router)
app.include_router(planners_router)
app.include_router(gpa_router)
app.include_router(assignments_router)
app.include_router(attendance_router)
app.include_router(settings_router)

try:
    app.mount("/static", StaticFiles(directory="frontend"), name="static")
except RuntimeError:
    print("Warning: 'frontend' directory not found. Please create it and add index.html")

@app.get("/")
def home():
    return FileResponse("frontend/index.html")