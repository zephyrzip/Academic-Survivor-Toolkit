from typing import List

from fastapi import APIRouter, HTTPException, status

from backend.models.assignment import Assignment, AssignmentCreate, AssignmentUpdate
import backend.services.assignment_services as assignment_services
from backend.services.course_services import CourseNotFoundError

router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"]
)

@router.post(
    "",
    response_model=Assignment,
    status_code=status.HTTP_201_CREATED
)
def create_assignment_route(assignment: AssignmentCreate):
    try:
        return assignment_services.create_assignment(assignment)

    except assignment_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    
@router.get(
    "",
    response_model=List[Assignment]
) 
def get_all_assignments_route():
    return assignment_services.get_all_assignments()

@router.get(
    "/{assignment_id}",
    response_model=Assignment
)
def get_assignment_route(assignment_id: str):
    try:
        return assignment_services.get_assignment(assignment_id)

    except assignment_services.AssignmentNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    
@router.get(
    "/course/{course_id}",
    response_model=List[Assignment]
)
def get_assignments_by_course_route(course_id: str):
    try:
        return assignment_services.get_assignments_by_course(course_id)

    except assignment_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    
@router.patch(
    "/{assignment_id}",
    response_model=Assignment
)
def update_assignment_route(
    assignment_id: str,
    updates: AssignmentUpdate
):
    try:
        return assignment_services.update_assignment(assignment_id, updates)

    except assignment_services.AssignmentNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except assignment_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@router.delete(
    "/{assignment_id}",
    status_code=status.HTTP_204_NO_CONTENT
)   
def delete_assignment_route(assignment_id: str):
    try:
        assignment_services.delete_assignment(assignment_id)

    except assignment_services.AssignmentNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    