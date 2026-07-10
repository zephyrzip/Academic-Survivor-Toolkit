from typing import Dict

from fastapi import APIRouter, HTTPException, status

from backend.models.setting import AcademicDefaults, CountdownDefaults, PlannerDefaults
import backend.services.setting_services as settings_services

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


@router.get("/academic", response_model=AcademicDefaults)
def get_academic_route():
    return settings_services.get_academic()


@router.put("/academic", response_model=AcademicDefaults)
def update_academic_route(data: AcademicDefaults):
    try:
        return settings_services.update_academic(data)
    except settings_services.InvalidSettingsDataError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/grading", response_model=Dict[str, float])
def get_grading_route():
    return settings_services.get_grading()


@router.put("/grading", response_model=Dict[str, float])
def update_grading_route(data: Dict[str, float]):
    try:
        return settings_services.update_grading(data)
    except settings_services.InvalidSettingsDataError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/planner", response_model=PlannerDefaults)
def get_planner_route():
    return settings_services.get_planner()


@router.put("/planner", response_model=PlannerDefaults)
def update_planner_route(data: PlannerDefaults):
    try:
        return settings_services.update_planner(data)
    except settings_services.InvalidSettingsDataError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/countdown", response_model=CountdownDefaults)
def get_countdown_route():
    return settings_services.get_countdown()


@router.put("/countdown", response_model=CountdownDefaults)
def update_countdown_route(data: CountdownDefaults):
    return settings_services.update_countdown(data)