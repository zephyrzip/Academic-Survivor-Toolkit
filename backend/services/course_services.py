import uuid
from typing import List

import backend.database.database as db
from backend.models.course import Course, CourseCreate, CourseUpdate


class CourseNotFoundError(Exception):
    """Raised when a course cannot be found."""
    pass


def create_course(course_data: CourseCreate) -> Course:
    """
    Create a new course.
    """

    courses = db.get_section("courses")

    new_course = Course(
        id=uuid.uuid4().hex,
        **course_data.model_dump(mode="json")
    )

    courses[new_course.id] = new_course.model_dump(mode="json")

    db.update_section("courses", courses)

    return new_course


def get_all_courses() -> List[Course]:
    """
    Return every course.
    """

    courses = db.get_section("courses")

    return [
        Course(**course)
        for course in courses.values()
    ]


def get_course(course_id: str) -> Course:
    """
    Return one course by ID.
    """

    courses = db.get_section("courses")

    course = courses.get(course_id)

    if course is None:
        raise CourseNotFoundError(
            f"Course '{course_id}' not found."
        )

    return Course(**course)


def update_course(
    course_id: str,
    updates: CourseUpdate
) -> Course:
    """
    Update an existing course.
    """

    courses = db.get_section("courses")

    if course_id not in courses:
        raise CourseNotFoundError(
            f"Course '{course_id}' not found."
        )

    updated_course = courses[course_id]

    updated_course.update(
        updates.model_dump(exclude_unset=True)
    )

    courses[course_id] = updated_course

    db.update_section("courses", courses)

    return Course(**updated_course)


def delete_course(course_id: str) -> None:
    """
    Delete a course.
    """

    courses = db.get_section("courses")

    if course_id not in courses:
        raise CourseNotFoundError(
            f"Course '{course_id}' not found."
        )

    del courses[course_id]

    db.update_section("courses", courses)