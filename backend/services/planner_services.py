import uuid
from datetime import datetime, timezone
from typing import List

import backend.database.database as db
from backend.models.planner import Planner, PlannerCreate, PlannerUpdate

VALID_PRIORITIES = {
    "low",
    "medium",
    "high"
}

class PlannerNotFoundError(Exception):
    pass

class InvalidPlannerDataError(Exception):
    pass

def _validate_priority(priority: str) -> None:
    if priority not in VALID_PRIORITIES:
        raise InvalidPlannerDataError(
            f"priority must be one of {sorted(VALID_PRIORITIES)}, got {priority!r}"
        )

def create_planner_item(item: PlannerCreate) -> Planner:
    _validate_priority(item.priority)

    planner_items = db.get_section("planner")

    new_item = Planner(
        id=uuid.uuid4().hex,
        created_at=datetime.now(timezone.utc),
        **item.model_dump(mode="json")
    )

    planner_items[new_item.id] = new_item.model_dump(mode="json")

    db.update_section("planner", planner_items)

    return new_item

def get_all_planner_items() -> List[Planner]:
    return [Planner(**item) for item in db.get_section("planner").values()]

def get_planner_item(item_id: str) -> Planner:
    planner_items = db.get_section("planner")
    data = planner_items.get(item_id)
    if data is None:
        raise PlannerNotFoundError(f"Planner item {item_id!r} not found")
    return Planner(**data)

def update_planner_item(item_id: str, updates: PlannerUpdate) -> Planner:
    planner_items = db.get_section("planner")
    current = planner_items.get(item_id)
    if current is None:
        raise PlannerNotFoundError(f"Planner item {item_id!r} not found")
 
    fields = updates.model_dump(exclude_unset=True, mode="json")
 
    if "priority" in fields:
        _validate_priority(fields["priority"])

    updated_data = {**current, **fields}
    updated = Planner(**updated_data)

    planner_items[item_id] = updated.model_dump(mode="json")

    db.update_section("planner", planner_items)

    return updated

def delete_planner_item(item_id: str) -> None:
    planner_items = db.get_section("planner")
    if item_id not in planner_items:
        raise PlannerNotFoundError(f"Planner item {item_id!r} not found")

    del planner_items[item_id]

    db.update_section("planner", planner_items)