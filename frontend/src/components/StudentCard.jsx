import StudentCourseLink from './StudentCourseLink'

function StudentCard({ student, onEdit, onDelete, courses }) {
  return (
    <article className="student-card">
      <div className="student-card__header">
        <div>
          <h3>{student.name}</h3>
          <p>{student.course}</p>
        </div>
        <span className={`badge badge--${student.status}`}>{student.status}</span>
      </div>

      <div className="student-metrics">
        <div>
          <strong>{student.grade}%</strong>
          <span>Grade</span>
        </div>
        <div>
          <strong>{student.attendance}%</strong>
          <span>Attendance</span>
        </div>
      </div>

      <p className="student-email">{student.email}</p>
      <StudentCourseLink student={student} courses={courses} />
      {student.notes ? <p className="student-notes">{student.notes}</p> : null}

      <div className="card-actions">
        <button type="button" className="secondary-btn" onClick={() => onEdit(student)}>
          Edit
        </button>
        <button type="button" className="danger-btn" onClick={() => onDelete(student.id)}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default StudentCard
