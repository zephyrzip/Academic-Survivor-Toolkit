from typing import Optional
from pydantic import BaseModel, Field


class CourseBase(BaseModel):
    name: str
    coursecode: str
    credits: float = Field(gt=0)
    semester: str


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    """All fields optional - only the ones provided get updated."""
    name: Optional[str] = None
    coursecode: Optional[str] = None
    semester: Optional[str] = None
    credits: Optional[float] = Field(default=None, gt=0)
    


class Course(CourseBase):
    id: str