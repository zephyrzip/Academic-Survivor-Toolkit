from typing import List

from fastapi import APIRouter, HTTPException, status

from backend.models.countdown import (
    CountdownCreate,
    CountdownResponse,
    CountdownUpdate,
)
from backend.services import countdown_services

router = APIRouter(
    prefix="/countdowns",
    tags=["Countdowns"]
)


@router.post(
    "",
    response_model=CountdownResponse,
    response_model_exclude_none=True,
    status_code=status.HTTP_201_CREATED
)
def create_countdown(countdown: CountdownCreate):
    return countdown_services.create_countdown(countdown)


@router.get(
    "",
    response_model=List[CountdownResponse],
    response_model_exclude_none=True
)
def get_all_countdowns():
    return countdown_services.get_all_countdowns()


@router.get(
    "/{countdown_id}",
    response_model=CountdownResponse,
    response_model_exclude_none=True
)
def get_countdown(countdown_id: str):
    try:
        return countdown_services.get_countdown(countdown_id)
    except countdown_services.CountdownNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.put(
    "/{countdown_id}",
    response_model=CountdownResponse,
    response_model_exclude_none=True
)
def update_countdown(countdown_id: str, updates: CountdownUpdate):
    try:
        return countdown_services.update_countdown(countdown_id, updates)
    except countdown_services.CountdownNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.delete(
    "/{countdown_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_countdown(countdown_id: str):
    try:
        countdown_services.delete_countdown(countdown_id)
    except countdown_services.CountdownNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
