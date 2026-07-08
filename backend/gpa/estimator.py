from typing import Iterable

from backend.gpa import calculations as calc
from backend.gpa.models import GPAEstimate


def build_gpa_estimate(
    course_id: str,
    entries: Iterable[dict]
) -> GPAEstimate:

    graded = calc.weight_graded(entries)
    remaining = calc.remaining_weight(entries)

    current = calc.current_percentage(entries)
    predicted = calc.predicted_percentage(entries)
    best = calc.best_case_final_percentage(entries)
    worst = calc.worst_case_final_percentage(entries)

    return GPAEstimate(
        course_id=course_id,
        weight_graded=round(graded, 2),
        weight_remaining=round(remaining, 2),
        current_percentage=(
            round(current, 2)
            if current is not None
            else None
        ),
        best_case_percentage=round(best, 2),
        worst_case_percentage=round(worst, 2),
        predicted_percentage=round(predicted,2),
    )