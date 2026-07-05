from typing import List, Optional

from fastapi import APIRouter, HTTPException, status

from backend.models.attendance import (
    Attendance,
    AttendanceCreate,
    AttendanceUpdate,
)
from backend.services import attendance_services

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.post(
    "",
    response_model=Attendance,
    status_code=status.HTTP_201_CREATED
)
def create_attendance_route(attendance: AttendanceCreate):
    try:
        return attendance_services.create_attendance(attendance)

    except attendance_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

    except attendance_services.InvalidAttendanceDataError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    
@router.get(
    "",
    response_model=List[Attendance]
)
def get_all_attendance_route():
    return attendance_services.get_all_attendance()

@router.get(
    "/{attendance_id}",
    response_model=Attendance
)
def get_attendance_route(attendance_id: str):
    try:
        return attendance_services.get_attendance(attendance_id)

    except attendance_services.AttendanceNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    
@router.get(
    "/course/{course_id}",
    response_model=Attendance
)
def get_attendance_by_course_route(course_id: str):
    try:
        return attendance_services.get_attendance_by_course(course_id)

    except attendance_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )  
    except attendance_services.AttendanceNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    
@router.get(
    "/{attendance_id}/summary",
    response_model=Attendance
)
def get_attendance_summary_route(attendance_id: str):
    try:
        return attendance_services.get_attendance_summary(attendance_id)

    except attendance_services.AttendanceNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

@router.patch(
    "/{attendance_id}", 
    response_model=Attendance
)
def update_attendance_route(attendance_id: str, attendance: AttendanceUpdate):
    try:
        return attendance_services.update_attendance(attendance_id, attendance)

    except attendance_services.AttendanceNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

    except attendance_services.CourseNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    
    except attendance_services.InvalidAttendanceDataError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    
@router.delete(
    "/{attendance_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_attendance_route(attendance_id: str):
    try:
        attendance_services.delete_attendance(attendance_id)

    except attendance_services.AttendanceNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
