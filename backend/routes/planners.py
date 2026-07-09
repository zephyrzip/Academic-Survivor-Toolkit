from typing import List

from fastapi import APIRouter, HTTPException, status

from backend.models.planner import Planner, PlannerCreate, PlannerUpdate
from backend.services import planner_services

router = APIRouter(
    prefix="/planner",
    tags=["Planner"]
)


@router.post(
    "",
    response_model=Planner,
    status_code=status.HTTP_201_CREATED
)
def create_planner_item(item: PlannerCreate):
    try:
        return planner_services.create_planner_item(item)
    except planner_services.InvalidPlannerDataError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "",
    response_model=List[Planner]
)
def get_all_planner_items():
    return planner_services.get_all_planner_items()


@router.get(
    "/{item_id}",
    response_model=Planner
)
def get_planner_item(item_id: str):
    try:
        return planner_services.get_planner_item(item_id)
    except planner_services.PlannerNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.patch(
    "/{item_id}",
    response_model=Planner
)
def update_planner_item(item_id: str, updates: PlannerUpdate):
    try:
        return planner_services.update_planner_item(item_id, updates)
    except planner_services.PlannerNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except planner_services.InvalidPlannerDataError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.delete(
    "/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_planner_item(item_id: str):
    try:
        planner_services.delete_planner_item(item_id)
    except planner_services.PlannerNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )