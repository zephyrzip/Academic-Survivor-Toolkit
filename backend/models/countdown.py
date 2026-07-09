from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CountdownBase(BaseModel):
    title: str
    target_date: datetime
    description: Optional[str] = None


class CountdownCreate(CountdownBase):
    pass


class CountdownUpdate(BaseModel):
    title: Optional[str] = None
    target_date: Optional[datetime] = None
    description: Optional[str] = None


class Countdown(CountdownBase):
    id: str


class CountdownResponse(Countdown):
    expired: bool
    days: Optional[int] = None
    hours: Optional[int] = None
    minutes: Optional[int] = None
    seconds: Optional[int] = None
    days_overdue: Optional[int] = None
