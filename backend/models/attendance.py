from typing import Optional
from pydantic import BaseModel, Field

class AttendanceBase(BaseModel):
    course_id: str
    total_classes: int = Field(ge=0)
    attended_classes: int = Field(ge=0)
    target_percentage: float = Field(default=75, ge=0, le=100)

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceUpdate(BaseModel):
    total_classes: Optional[int] = Field(default=None, ge=0)
    attended_classes: Optional[int] = Field(default=None, ge=0)
    target_percentage: Optional[float] = Field(default=None, ge=0, le=100)

class Attendance(AttendanceBase):
    id: str

