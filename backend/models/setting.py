from typing import Dict

from pydantic import BaseModel, Field


class AcademicDefaults(BaseModel):
    attendance_target: float = Field(default=75, ge=0, le=100)
    minimum_attendance: float = Field(default=75, ge=0, le=100)
    passing_marks: float = Field(default=40, ge=0, le=100)
    default_course_credit: int = Field(default=4, gt=0)
    internal_target: float = Field(default=80, ge=0, le=100)
    semester_target_gpa: float = Field(default=8, ge=0)


class PlannerDefaults(BaseModel):
    default_priority: str = Field(default="medium", pattern="^(low|medium|high)$")
    default_estimated_duration: int = Field(default=60, gt=0)
    default_reminder_days: int = Field(default=1, ge=0)


class CountdownDefaults(BaseModel):
    timezone: str = "Asia/Kolkata"
    date_format: str = "DD/MM/YYYY"
    show_expired: bool = True


DEFAULT_GRADING_SCALE: Dict[str, float] = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0,
}


class Settings(BaseModel):
    academic: AcademicDefaults = Field(default_factory=AcademicDefaults)
    grading_scale: Dict[str, float] = Field(
        default_factory=lambda: dict(DEFAULT_GRADING_SCALE)
    )
    planner: PlannerDefaults = Field(default_factory=PlannerDefaults)
    countdown: CountdownDefaults = Field(default_factory=CountdownDefaults)