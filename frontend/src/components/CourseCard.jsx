import { Link } from 'react-router-dom'

function CourseCard({ course, onRemove }) {
  const progressTone = course.progress >= 70 ? 'high' : course.progress >= 50 ? 'mid' : 'low'

  return (
    <article className="course-card">
      <div className="course-card__top">
        <div>
          <p className="course-code">{course.code}</p>
          <h3>{course.title}</h3>
        </div>
        <span className={`difficulty-badge difficulty-badge--${course.difficulty.toLowerCase()}`}>
          {course.difficulty}
        </span>
      </div>

      <p className="course-description">{course.description}</p>

      <div className="course-stats">
        <div>
          <span>Semester</span>
          <strong>{course.semester}</strong>
        </div>
        <div>
          <span>Credits</span>
          <strong>{course.credits}</strong>
        </div>
        <div>
          <span>Modules</span>
          <strong>{course.modules}</strong>
        </div>
        <div>
          <span>GPA</span>
          <strong>{course.gpa}</strong>
        </div>
      </div>

      <div className="progress-block">
        <div className="progress-labels">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="progress-bar">
          <span className={`progress-fill progress-fill--${progressTone}`} style={{ width: `${course.progress}%` }} />
        </div>
      </div>

      <div className="card-actions">
        <Link className="text-link" to={`/courses/${course.id}`}>
          Open Course
        </Link>
        <button type="button" className="icon-btn" onClick={() => onRemove(course.id)} aria-label={`Remove ${course.title}`}>
          ⋯
        </button>
      </div>
    </article>
  )
}

export default CourseCard
