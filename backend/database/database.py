import json
from pathlib import Path
from typing import Any, Optional

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data.json"

VALID_SECTIONS = {"gpa", "attendance", "planner", "countdown", "settings", "courses", "assignments"}

def _default_data() -> dict:
    return {
        "courses": {},
        "gpa": {},
        "attendance": {},
        "planner": {},
        "countdown": {},
        "settings": {},
        "assignments": {}
    }

def load_data() -> dict:
    if not DATA_FILE.exists():
        save_data(_default_data())
        return _default_data()
 
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        # If the file is corrupted or unreadable, reset to default data
        data = _default_data()
        save_data(_default_data())
        return _default_data()
    
def save_data(data: dict) -> None:
    with open(DATA_FILE, "w") as f:
        json.dump(
            data,
            f,
            indent=2,
            default=str  # This will convert non-serializable objects to strings
        )

def get_section(section: str) -> Optional[dict]:

    if section not in VALID_SECTIONS:
        raise ValueError(f"Invalid section: {section}. Valid sections are: {VALID_SECTIONS}")
    data = load_data()
    return data.get(section)

def update_section(section: str, new_data: dict) -> None:

    if section not in VALID_SECTIONS:
        raise ValueError(f"Invalid section: {section}. Valid sections are: {VALID_SECTIONS}")
    data = load_data()
    data[section] = new_data
    save_data(data)

def reset_database() -> None:
    save_data(_default_data())
