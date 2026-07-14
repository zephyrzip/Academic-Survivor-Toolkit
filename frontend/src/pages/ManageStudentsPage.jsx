import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar'

function ManageStudentsPage({ students, onDeleteStudent, courses, search, setSearch, statusFilter, setStatusFilter, loading }) {
  const navigate = useNavigate()

  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <PageHeader
        eyebrow="Manage students"
        title="Enrolled learners"
        description="Review learner profiles without leaving the current workspace."
        actions={
          <>
            <button type="button" className="secondary-btn" onClick={() => navigate('/dashboard')}>
              Back to dashboard
            </button>
            <button type="button" className="primary-btn" onClick={() => navigate('/students/create')}>
              Create student
            </button>
          </>
        }
      />

      <div className="toolbar">
        <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students" />
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="review">Review</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {loading ? (
        <div className="student-grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="student-card skeleton-card" />
          ))}
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <h3>No students yet</h3>
          <p>Add a student to begin tracking progress and attendance.</p>
        </div>
      ) : (
        <div className="student-grid">
          {students.map((student) => {
            const enrolledCourses = courses.filter((course) => course.code === student.courseCode).length

            return (
              <article key={student.id} className="student-card">
                <div className="student-card__header">
                  <div>
                    <h3>{student.name}</h3>
                    <p>{student.course}</p>
                  </div>
                  <span className={`badge badge--${student.status || 'active'}`}>{student.status || 'active'}</span>
                </div>

                <div className="student-metrics">
                  <div>
                    <strong>{student.id || student.studentId || 'N/A'}</strong>
                    <span>Student ID</span>
                  </div>
                  <div>
                    <strong>{enrolledCourses}</strong>
                    <span>Courses</span>
                  </div>
                  <div>
                    <strong>{student.grade || 0}%</strong>
                    <span>GPA</span>
                  </div>
                  <div>
                    <strong>{student.attendance || 0}%</strong>
                    <span>Attendance</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button type="button" className="secondary-btn">
                    View Profile
                  </button>
                  <button type="button" className="secondary-btn" onClick={() => {}}>
                    Edit
                  </button>
                  <button type="button" className="danger-btn" onClick={() => onDeleteStudent(student.id)}>
                    Delete
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </motion.section>
  )
}

export default ManageStudentsPage
