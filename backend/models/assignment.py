from datetime import date
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class AssignmentStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    overdue = "overdue"


class AssignmentBase(BaseModel):
    name: str
    description: Optional[str] = None
    due_date: Optional[date] = None
    course_id: str
    status: AssignmentStatus = AssignmentStatus.pending


class AssignmentCreate(AssignmentBase):
    pass


class AssignmentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    course_id: Optional[str] = None
    status: Optional[AssignmentStatus] = None


class Assignment(AssignmentBase):
    id: str