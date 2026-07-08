from typing import Iterable, Optional

FULL_WEIGHT = 100


def weighted_earned_points(entries: Iterable[dict]) -> float:
    """Returns the weighted points earned so far."""
    return sum(
        (entry["marks_obtained"] / entry["total_marks"])
        * entry["weight_percentage"]
        for entry in entries
    )


def weight_graded(entries: Iterable[dict]) -> float:
    """Returns the total assessment weight already graded."""
    return sum(
        entry["weight_percentage"]
        for entry in entries
    )


def remaining_weight(entries: Iterable[dict]) -> float:
    """Returns the assessment weight still remaining."""
    return FULL_WEIGHT - weight_graded(entries)


def current_percentage(entries: Iterable[dict]) -> Optional[float]:
    """Current average over completed assessments."""
    graded = weight_graded(entries)

    if graded == 0:
        return None

    return (
        weighted_earned_points(entries)
        / graded
    ) * 100


def best_case_final_percentage(entries: Iterable[dict]) -> float:
    """
    Assumes the student scores 100%
    on every remaining assessment.
    """
    earned = weighted_earned_points(entries)

    return earned + remaining_weight(entries)


def worst_case_final_percentage(entries: Iterable[dict]) -> float:
    """
    Assumes the student scores 0%
    on every remaining assessment.
    """
    return weighted_earned_points(entries)


def required_average_for_target(
    entries: Iterable[dict],
    target_percentage: float
) -> Optional[float]:
    """
    Average percentage required on all remaining
    assessments to reach the desired final percentage.
    """
    remaining = remaining_weight(entries)

    if remaining == 0:
        return None

    earned = weighted_earned_points(entries)

    required_weighted_points = (
        target_percentage
        - earned
    )

    return (
        required_weighted_points
        / remaining
    ) * 100