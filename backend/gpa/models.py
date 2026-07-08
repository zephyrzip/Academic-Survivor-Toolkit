from typing import Optional
from pydantic import BaseModel, Field

class MarkEntryBase(BaseModel):
    course_id: str
    component_name: str = Field(..., min_length= 1)
    marks_obtained: float = Field(..., ge=0)
    total_marks: float = Field(..., gt=0)
    weight_percentage: float = Field(..., ge=0, le=100)

class MarkEntryCreate(MarkEntryBase):
    pass

class MarkEntryUpdate(BaseModel):
    component_name: Optional[str] = Field(default= None)
    marks_obtained: Optional[float] = Field(default=None, ge=0)
    total_marks: Optional[float] = Field(default=None, gt=0)
    weight_percentage: Optional[float] = Field(default=None, ge=0, le=100)

class MarkEntry(MarkEntryBase):
    id: str

class GPAEstimate(BaseModel):
    course_id: str
    weight_graded: float
    weight_remaining: float
    current_percentage: float
    best_case_percentage: float
    worst_case_percentage: float
    predicted_percentage: float
