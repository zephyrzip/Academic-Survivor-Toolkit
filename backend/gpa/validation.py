from typing import Iterable, Optional

from backend.gpa import data as gpa_data
from backend.gpa.models import MarkEntryCreate


MAX_WEIGHT = 100
MIN_PERCENTAGE = 0
MAX_PERCENTAGE = 100
MIN_GPA = 0
MAX_GPA = 10


class InvalidMarkDataError(Exception):
    """Raised when GPA mark data violates business rules."""
    pass


def validate_mark_entry(entry_data: MarkEntryCreate) -> None:
    if entry_data.marks_obtained > entry_data.total_marks:
        raise InvalidMarkDataError(
            "Marks obtained cannot exceed total marks."
        )

def validate_component_name(component_name: str) -> None:
    cleaned_name = component_name.strip()

    if not cleaned_name:
        raise InvalidMarkDataError(
            "Component name cannot be empty."
        )


def validate_course_exists(course_id: str) -> None:
    if not gpa_data.course_exists(course_id):
        raise InvalidMarkDataError(
            f"Course '{course_id}' does not exist."
        )


def validate_course_weight(
    other_entries: Iterable[dict],
    new_weight: float
) -> None:
    total_weight = (
        sum(entry["weight_percentage"] for entry in other_entries)
        + new_weight
    )

    if total_weight > MAX_WEIGHT:
        raise InvalidMarkDataError(
            f"Total course weight cannot exceed {MAX_WEIGHT}%."
        )

def validate_duplicate_component(
    existing_entries: Iterable[dict],
    component_name: str,
    exclude_id: Optional[str] = None,
) -> None:
    normalized_name = (component_name or "").strip().lower()

    for entry in existing_entries:
        if exclude_id is not None and entry.get("id") == exclude_id:
            continue

        existing_component = str(entry.get("component_name", "")).strip().lower()
        if existing_component == normalized_name:
            raise InvalidMarkDataError(
                f"Component '{component_name}' already exists."
            )


def validate_entry_exists(
    entry_id: int,
    entries: Iterable[dict]
) -> None:
    if not any(entry["id"] == entry_id for entry in entries):
        raise InvalidMarkDataError(
            f"Mark entry '{entry_id}' does not exist."
        )


def validate_percentage(percentage: float) -> None:
    if not (MIN_PERCENTAGE <= percentage <= MAX_PERCENTAGE):
        raise InvalidMarkDataError(
            f"Percentage must be between {MIN_PERCENTAGE} and {MAX_PERCENTAGE}."
        )


def validate_remaining_weight(remaining_weight: float) -> None:
    if remaining_weight < MIN_PERCENTAGE or remaining_weight > MAX_PERCENTAGE:
        raise InvalidMarkDataError(
            f"Remaining weight must be between {MIN_PERCENTAGE} and {MAX_PERCENTAGE}."
        )


def validate_target_gpa(target_gpa: float) -> None:
    if not (MIN_GPA <= target_gpa <= MAX_GPA):
        raise InvalidMarkDataError(
            f"Target GPA must be between {MIN_GPA} and {MAX_GPA}."
        )
