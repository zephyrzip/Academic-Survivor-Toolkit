import math
import uuid
from typing import List

import backend.database.database as db
from backend.models.attendance import (
    Attendance,
    AttendanceCreate,
    AttendanceUpdate,
)
from backend.services.course_services import CourseNotFoundError


class AttendanceNotFoundError(Exception):
    """Raised when an attendance record cannot be found."""
    pass


class InvalidAttendanceDataError(Exception):
    """Raised when attendance data is invalid."""
    pass


def _course_exists(course_id: str) -> bool:
    courses = db.get_section("courses")
    return course_id in courses


def _validate_attendance_data(attendance_data: AttendanceCreate) -> None:
    if attendance_data.attended_classes > attendance_data.total_classes:
        raise InvalidAttendanceDataError(
            "Attended classes cannot exceed total classes."
        )


def create_attendance(attendance_data: AttendanceCreate) -> Attendance:
    """
    Create a new attendance record.
    """

    if not _course_exists(attendance_data.course_id):
        raise CourseNotFoundError(
            f"Course '{attendance_data.course_id}' does not exist."
        )

    _validate_attendance_data(attendance_data)

    attendance_section = db.get_section("attendance")

    new_attendance = Attendance(
        id=uuid.uuid4().hex,
        **attendance_data.model_dump(mode="json")
    )

    attendance_section[new_attendance.id] = new_attendance.model_dump(mode="json")

    db.update_section("attendance", attendance_section)

    return new_attendance


def get_all_attendance() -> List[Attendance]:
    """
    Return every attendance record.
    """

    attendance_section = db.get_section("attendance")

    return [
        Attendance(**record)
        for record in attendance_section.values()
    ]


def get_attendance(attendance_id: str) -> Attendance:
    """
    Return one attendance record by ID.
    """

    attendance_section = db.get_section("attendance")

    attendance_record = attendance_section.get(attendance_id)

    if attendance_record is None:
        raise AttendanceNotFoundError(
            f"Attendance record '{attendance_id}' not found."
        )

    return Attendance(**attendance_record)


def get_attendance_by_course(course_id: str) -> Attendance:
    """
    Return the attendance record for a course.
    """

    if not _course_exists(course_id):
        raise CourseNotFoundError(
            f"Course '{course_id}' does not exist."
        )

    attendance_section = db.get_section("attendance")

    for record in attendance_section.values():
        if record["course_id"] == course_id:
            return Attendance(**record)

    raise AttendanceNotFoundError(
        f"No attendance record found for course '{course_id}'."
    )


def update_attendance(
    attendance_id: str,
    attendance_data: AttendanceUpdate
) -> Attendance:
    """
    Update an existing attendance record.
    """

    attendance_section = db.get_section("attendance")

    attendance_record = attendance_section.get(attendance_id)

    if attendance_record is None:
        raise AttendanceNotFoundError(
            f"Attendance record '{attendance_id}' not found."
        )

    updated_data = {
        **attendance_record,
        **attendance_data.model_dump(exclude_unset=True)
    }

    if not _course_exists(updated_data["course_id"]):
        raise CourseNotFoundError(
            f"Course '{updated_data['course_id']}' does not exist."
        )

    _validate_attendance_data(
        AttendanceCreate(**updated_data)
    )

    attendance_section[attendance_id] = updated_data

    db.update_section("attendance", attendance_section)

    return Attendance(**updated_data)


def delete_attendance(attendance_id: str) -> None:
    """
    Delete an attendance record.
    """

    attendance_section = db.get_section("attendance")

    if attendance_id not in attendance_section:
        raise AttendanceNotFoundError(
            f"Attendance record '{attendance_id}' not found."
        )

    del attendance_section[attendance_id]

    db.update_section("attendance", attendance_section)


def get_attendance_summary(attendance_id: str) -> dict:
    """
    Return calculated attendance statistics.
    """

    record = get_attendance(attendance_id)

    return _calculate_summary(record)


def _calculate_summary(record: Attendance) -> dict:
    total = record.total_classes
    attended = record.attended_classes
    target = record.target_percentage

    current_percentage = (
        attended / total * 100
        if total > 0 else 100.0
    )

    meets_target = current_percentage >= target

    if target <= 0:
        classes_can_skip = None
    else:
        raw_skip = (
            attended - (target / 100) * total
        ) / (target / 100)

        classes_can_skip = max(
            0,
            math.floor(raw_skip)
        )

    if target >= 100:
        classes_needed_to_attend = (
            0 if meets_target else None
        )
    else:
        raw_needed = (
            ((target / 100) * total) - attended
        ) / (1 - target / 100)

        classes_needed_to_attend = max(
            0,
            math.ceil(raw_needed)
        )

    return {
        "current_percentage": round(current_percentage, 2),
        "meets_target": meets_target,
        "classes_can_skip": classes_can_skip,
        "classes_needed_to_attend": classes_needed_to_attend,
    }