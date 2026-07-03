from typing import List

from fastapi import APIRouter, HTTPException, status

from backend.models.course import Course, CourseCreate, CourseUpdate
from backend.services import course_services

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


@router.post(
    "",
    response_model=Course,
    status_code=status.HTTP_201_CREATED
)
def create_course(course: CourseCreate):
    return course_services.create_course(course)


@router.get(
    "",
    response_model=List[Course]
)
def get_all_courses():
    return course_services.get_all_courses()


@router.get(
    "/{course_id}",
    response_model=Course
)
def get_course(course_id: str):
    try:
        return course_services.get_course(course_id)

    except course_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.patch(
    "/{course_id}",
    response_model=Course
)
def update_course(
    course_id: str,
    updates: CourseUpdate
):
    try:
        return course_services.update_course(
            course_id,
            updates
        )

    except course_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.delete(
    "/{course_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_course(course_id: str):
    try:
        course_services.delete_course(course_id)

    except course_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )