from typing import Iterable, Optional

from backend.gpa import calculations as calc


def predicted_percentage(
    entries: Iterable[dict]
) -> Optional[float]:
    """
    Predict the final course percentage assuming the student's
    future performance matches their current performance.
    """
    current = calc.current_percentage(entries)

    if current is None:
        return None

    earned = calc.weighted_earned_points(entries)
    remaining = calc.remaining_weight(entries)

    return earned + (current / 100) * remaining