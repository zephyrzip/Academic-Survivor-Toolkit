import backend.database.database as db

def get_all_entries() -> dict:
    return db.get_section("gpa")

def save_entries(entries: dict) -> None:
    db.update_section("gpa", entries)

def course_exists(course_id: str) -> bool:
    courses = db.get_section("courses")
    return course_id in courses