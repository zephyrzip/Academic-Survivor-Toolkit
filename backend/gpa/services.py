import uuid
from typing import List, Optional

from backend.gpa import data as gpa_data
from backend.gpa import estimator, validation
from backend.gpa.models import(
    GPAEstimate,
    MarkEntry,
    MarkEntryCreate,
    MarkEntryUpdate,
)
from backend.services.course_services import CourseNotFoundError


class MarkEntryNotFoundError(Exception):
    pass

def _entries_for_course(
    all_entries: dict[str, dict],
    course_id: str,
    exclude_id: Optional[str] = None,
) -> List[dict]:
    """
    Return all mark entries belonging to a course.

    Optionally excludes one entry, which is useful during updates
    when validating duplicate components or course weights.
    """
    return [
        entry
        for entry in all_entries.values()
        if (
            entry["course_id"] == course_id
            and entry["id"] != exclude_id
        )
    ]

def create_mark_entry(entry_data: MarkEntryCreate) -> MarkEntry:
    validation.validate_course_exists(entry_data.course_id)
    validation.validate_component_name(entry_data.component_name)
    validation.validate_mark_entry(entry_data)

    all_entries = gpa_data.get_all_entries()

    existing_for_course = _entries_for_course(
        all_entries,
        entry_data.course_id,
    )

    validation.validate_duplicate_component(
        existing_for_course,
        entry_data.component_name,
    )

    validation.validate_course_weight(
        existing_for_course,
        entry_data.weight_percentage,
    )

    new_entry = MarkEntry(
        id=uuid.uuid4().hex,
        **entry_data.model_dump(mode="json"),
    )

    all_entries[new_entry.id] = new_entry.model_dump(mode="json")
    gpa_data.save_entries(all_entries)

    return new_entry

def get_all_mark_entries() -> List[MarkEntry]:
    return [MarkEntry(**e) for e in gpa_data.get_all_entries().values()]


def get_mark_entry(entry_id: str) -> MarkEntry:
    all_entries = gpa_data.get_all_entries()
    entry = all_entries.get(entry_id)

    if entry is None:
        raise MarkEntryNotFoundError(f"Mark entry '{entry_id}' not found.")

    return MarkEntry(**entry)

def get_mark_entries_by_course(course_id: str) -> List[MarkEntry]:
    validation.validate_course_exists(course_id)

    all_entries = gpa_data.get_all_entries()

    return [
        MarkEntry(**e) for e in all_entries.values()
        if e["course_id"] == course_id
    ]

def update_mark_entry(entry_id: str, updates: MarkEntryUpdate) -> MarkEntry:
    all_entries = gpa_data.get_all_entries()
    entry = all_entries.get(entry_id)

    if entry is None:
        raise MarkEntryNotFoundError(f"Mark entry '{entry_id}' not found.")

    # Validate against the MERGED state (existing + incoming), not the
    # incoming payload alone — same principle as attendance updates.
    merged = {**entry, **updates.model_dump(exclude_unset=True)}

    validation.validate_course_exists(
        merged["course_id"]
    )

    validation.validate_component_name(merged["component_name"])
    entry_data = {
    key: value
    for key, value in merged.items()
    if key != "id"
}

    validation.validate_mark_entry(
        MarkEntryCreate(**entry_data)
    )

    other_entries = _entries_for_course(
        all_entries, merged["course_id"], exclude_id=entry_id
    )
    validation.validate_duplicate_component(
        other_entries,
        merged["component_name"],
        exclude_id=entry_id,
    )
    validation.validate_course_weight(other_entries, merged["weight_percentage"])

    all_entries[entry_id] = merged
    gpa_data.save_entries(all_entries)

    return MarkEntry(**merged)

def delete_mark_entry(entry_id: str) -> None:
    all_entries = gpa_data.get_all_entries()

    if entry_id not in all_entries:
        raise MarkEntryNotFoundError(f"Mark entry '{entry_id}' not found.")

    del all_entries[entry_id]
    gpa_data.save_entries(all_entries)


def get_estimate(course_id: str) -> GPAEstimate:
    validation.validate_course_exists(course_id)

    all_entries = gpa_data.get_all_entries()
    entries = _entries_for_course(all_entries, course_id)

    return estimator.build_gpa_estimate(course_id, entries)

