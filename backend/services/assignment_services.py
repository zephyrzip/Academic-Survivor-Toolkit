import uuid
from typing import List

import backend.database.database as db
from backend.models.assignment import Assignment, AssignmentCreate, AssignmentUpdate
from backend.services.course_services import CourseNotFoundError

def _course_exists(course_id: str) -> bool:
    courses = db.get_section("courses")
    return course_id in courses

class AssignmentNotFoundError(Exception):
    pass

def create_assignment(assignment_data: AssignmentCreate) -> Assignment:

    assignments = db.get_section("assignments")

    if not _course_exists(assignment_data.course_id):
        raise CourseNotFoundError(
            f"Course '{assignment_data.course_id}' does not exist."
        )

    new_assignment = Assignment(
        id=uuid.uuid4().hex,
        **assignment_data.model_dump(mode="json")
    )

    assignments[new_assignment.id] = new_assignment.model_dump(mode="json")

    db.update_section("assignments", assignments)

    return new_assignment

def get_all_assignments() -> List[Assignment]:

    assignments = db.get_section("assignments")

    return [
        Assignment(**assignment)
        for assignment in assignments.values()
    ]

def get_assignment(assignment_id: str) -> Assignment:

    assignments = db.get_section("assignments")

    assignment = assignments.get(assignment_id)

    if assignment is None:
        raise AssignmentNotFoundError(
            f"Assignment '{assignment_id}' not found."
        )

    return Assignment(**assignment)

def get_assignments_by_course(course_id: str) -> List[Assignment]:

    if not _course_exists(course_id):
        raise CourseNotFoundError(
            f"Course '{course_id}' does not exist."
        )

    assignments = db.get_section("assignments")

    return [
        Assignment(**assignment)
        for assignment in assignments.values()
        if assignment["course_id"] == course_id
    ]

def update_assignment(assignment_id: str, updates: AssignmentUpdate) -> Assignment:

    fields = updates.model_dump(exclude_unset=True)
    
    if course_id := fields.get("course_id"):
        if not _course_exists(course_id):
            raise CourseNotFoundError(
                f"Course '{fields['course_id']}' does not exist."
            )

    assignments = db.get_section("assignments")

    assignment = assignments.get(assignment_id)

    if assignment is None:
        raise AssignmentNotFoundError(
            f"Assignment '{assignment_id}' not found."
        )

    updated_assignment_data = {**assignment, **updates.model_dump(exclude_unset=True)}
    updated_assignment = Assignment(**updated_assignment_data)

    assignments[assignment_id] = updated_assignment.model_dump(mode="json")

    db.update_section("assignments", assignments)

    return updated_assignment

def delete_assignment(assignment_id: str) -> None:

    assignments = db.get_section("assignments")

    if assignment_id not in assignments:
        raise AssignmentNotFoundError(
            f"Assignment '{assignment_id}' not found."
        )

    del assignments[assignment_id]

    db.update_section("assignments", assignments)
