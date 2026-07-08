from typing import List

from fastapi import APIRouter, HTTPException, status

from backend.gpa.models import (
    GPAEstimate,
    MarkEntry,
    MarkEntryCreate,
    MarkEntryUpdate,
)
from backend.gpa.services import (
    MarkEntryNotFoundError,
    create_mark_entry,
    delete_mark_entry,
    get_all_mark_entries,
    get_estimate,
    get_mark_entries_by_course,
    get_mark_entry,
    update_mark_entry,
)
from backend.gpa.validation import InvalidMarkDataError
from backend.services.course_services import CourseNotFoundError

router = APIRouter(prefix="/gpa", tags=["GPA"])


@router.post("", response_model=MarkEntry, status_code=status.HTTP_201_CREATED)
def create_mark_entry_route(entry: MarkEntryCreate):
    try:
        return create_mark_entry(entry)
    except CourseNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except InvalidMarkDataError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("", response_model=List[MarkEntry])
def get_all_mark_entries_route():
    return get_all_mark_entries()

@router.get("/course/{course_id}", response_model=List[MarkEntry])
def get_mark_entries_by_course_route(course_id: str):
    try:
        return get_mark_entries_by_course(course_id)
    except CourseNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.get("/course/{course_id}/estimate", response_model=GPAEstimate)
def get_estimate_route(course_id: str):
    try:
        return get_estimate(course_id)
    except CourseNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.get("/{entry_id}", response_model=MarkEntry)
def get_mark_entry_route(entry_id: str):
    try:
        return get_mark_entry(entry_id)
    except MarkEntryNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.patch("/{entry_id}", response_model=MarkEntry)
def update_mark_entry_route(entry_id: str, updates: MarkEntryUpdate):
    try:
        return update_mark_entry(entry_id, updates)
    except MarkEntryNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except CourseNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except InvalidMarkDataError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mark_entry_route(entry_id: str):
    try:
        delete_mark_entry(entry_id)
    except MarkEntryNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))