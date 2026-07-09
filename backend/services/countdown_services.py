import uuid
from datetime import datetime, timezone
from typing import List

import backend.database.database as db
from backend.models.countdown import (
    Countdown,
    CountdownCreate,
    CountdownResponse,
    CountdownUpdate,
)


class CountdownNotFoundError(Exception):
    pass


def _as_aware_utc(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def _with_time_remaining(countdown: Countdown) -> CountdownResponse:
    target_date = _as_aware_utc(countdown.target_date)
    now = datetime.now(timezone.utc)
    seconds_delta = int((target_date - now).total_seconds())

    if seconds_delta <= 0:
        days_overdue = int((now - target_date).total_seconds()) // 86400
        return CountdownResponse(
            **countdown.model_dump(),
            expired=True,
            days_overdue=days_overdue
        )

    days, remainder = divmod(seconds_delta, 86400)
    hours, remainder = divmod(remainder, 3600)
    minutes, seconds = divmod(remainder, 60)

    return CountdownResponse(
        **countdown.model_dump(),
        expired=False,
        days=days,
        hours=hours,
        minutes=minutes,
        seconds=seconds
    )


def create_countdown(countdown_data: CountdownCreate) -> CountdownResponse:
    countdowns = db.get_section("countdown")

    new_countdown = Countdown(
        id=uuid.uuid4().hex,
        **countdown_data.model_dump(mode="json")
    )

    countdowns[new_countdown.id] = new_countdown.model_dump(mode="json")
    db.update_section("countdown", countdowns)

    return _with_time_remaining(new_countdown)


def get_all_countdowns() -> List[CountdownResponse]:
    return [
        _with_time_remaining(Countdown(**countdown))
        for countdown in db.get_section("countdown").values()
    ]


def get_countdown(countdown_id: str) -> CountdownResponse:
    countdowns = db.get_section("countdown")
    countdown = countdowns.get(countdown_id)

    if countdown is None:
        raise CountdownNotFoundError(
            f"Countdown '{countdown_id}' not found."
        )

    return _with_time_remaining(Countdown(**countdown))


def update_countdown(
    countdown_id: str,
    updates: CountdownUpdate
) -> CountdownResponse:
    countdowns = db.get_section("countdown")
    countdown = countdowns.get(countdown_id)

    if countdown is None:
        raise CountdownNotFoundError(
            f"Countdown '{countdown_id}' not found."
        )

    fields = updates.model_dump(exclude_unset=True, mode="json")
    updated_countdown_data = {**countdown, **fields}
    updated_countdown = Countdown(**updated_countdown_data)

    countdowns[countdown_id] = updated_countdown.model_dump(mode="json")
    db.update_section("countdown", countdowns)

    return _with_time_remaining(updated_countdown)


def delete_countdown(countdown_id: str) -> None:
    countdowns = db.get_section("countdown")

    if countdown_id not in countdowns:
        raise CountdownNotFoundError(
            f"Countdown '{countdown_id}' not found."
        )

    del countdowns[countdown_id]
    db.update_section("countdown", countdowns)
