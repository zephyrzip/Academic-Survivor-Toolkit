from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field


class PlannerBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = Field(
        pattern="^(low|medium|high)$"
    )
    due_date: Optional[date] = None
    completed: bool = False


class PlannerCreate(PlannerBase):
    pass


class PlannerUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = Field(
        default=None,
        pattern="^(low|medium|high)$"
    )
    due_date: Optional[date] = None
    completed: Optional[bool] = None


class Planner(PlannerBase):
    id: str
    created_at: datetime