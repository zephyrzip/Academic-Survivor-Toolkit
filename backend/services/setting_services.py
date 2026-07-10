from typing import Dict

import backend.database.database as db
from backend.models.setting import (
    AcademicDefaults,
    CountdownDefaults,
    PlannerDefaults,
    Settings,
)
from backend.services.planner_services import VALID_PRIORITIES

SETTINGS_KEY = "default"


class InvalidSettingsDataError(Exception):
    """Raised when settings data violates business rules."""
    pass


def _load_settings() -> Settings:
    section = db.get_section("settings")
    row = section.get(SETTINGS_KEY)

    if row is None:
        settings = Settings()
        _save_settings(settings)
        return settings

    return Settings(**row)


def _save_settings(settings: Settings) -> None:
    section = db.get_section("settings")
    section[SETTINGS_KEY] = settings.model_dump(mode="json")
    db.update_section("settings", section)


def _validate_grading_scale(grading_scale: Dict[str, float]) -> Dict[str, float]:
    if not grading_scale:
        raise InvalidSettingsDataError("Grading scale cannot be empty.")

    cleaned: Dict[str, float] = {}

    for grade, points in grading_scale.items():
        clean_grade = grade.strip()

        if not clean_grade:
            raise InvalidSettingsDataError("Grade labels cannot be empty.")

        if points < 0:
            raise InvalidSettingsDataError(
                f"Grade points for '{clean_grade}' cannot be negative."
            )

        cleaned[clean_grade] = points

    return cleaned


def _validate_semester_target_gpa(
    semester_target_gpa: float,
    grading_scale: Dict[str, float]
) -> None:
    max_points = max(grading_scale.values())

    if semester_target_gpa > max_points:
        raise InvalidSettingsDataError(
            f"semester_target_gpa ({semester_target_gpa}) cannot exceed the "
            f"highest grade point in the grading scale ({max_points})."
        )


def get_settings() -> Settings:
    return _load_settings()


def get_academic() -> AcademicDefaults:
    return _load_settings().academic


def update_academic(data: AcademicDefaults) -> AcademicDefaults:
    settings = _load_settings()

    _validate_semester_target_gpa(data.semester_target_gpa, settings.grading_scale)

    settings.academic = data
    _save_settings(settings)

    return settings.academic


def get_grading() -> Dict[str, float]:
    return _load_settings().grading_scale


def update_grading(data: Dict[str, float]) -> Dict[str, float]:
    settings = _load_settings()

    cleaned = _validate_grading_scale(data)
    _validate_semester_target_gpa(settings.academic.semester_target_gpa, cleaned)

    settings.grading_scale = cleaned
    _save_settings(settings)

    return settings.grading_scale


def get_planner() -> PlannerDefaults:
    return _load_settings().planner


def update_planner(data: PlannerDefaults) -> PlannerDefaults:
    if data.default_priority not in VALID_PRIORITIES:
        raise InvalidSettingsDataError(
            f"default_priority must be one of {sorted(VALID_PRIORITIES)}, "
            f"got {data.default_priority!r}"
        )

    settings = _load_settings()
    settings.planner = data
    _save_settings(settings)

    return settings.planner


def get_countdown() -> CountdownDefaults:
    return _load_settings().countdown


def update_countdown(data: CountdownDefaults) -> CountdownDefaults:
    settings = _load_settings()
    settings.countdown = data
    _save_settings(settings)

    return settings.countdown