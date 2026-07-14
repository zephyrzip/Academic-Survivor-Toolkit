import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingState from '../components/LoadingState'
import { fetchCourseById } from '../services/coursesApi'

function CourseDetailsPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCourse() {
      try {
        const data = await fetchCourseById(id)
        if (isMounted) {
          setCourse(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCourse()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return <LoadingState message="Loading course details..." />
  }

  if (error) {
    return <div className="error-state">{error}</div>
  }

  return (
    <section className="page-section detail-section">
      <Link className="text-link" to="/courses">
        ← Back to courses
      </Link>

      <div className="detail-card">
        <div className="detail-card__header">
          <div>
            <p className="eyebrow">Course overview</p>
            <h2>{course.title}</h2>
          </div>
          <span className="detail-badge">{course.level}</span>
        </div>

        <p className="course-description">{course.description}</p>

        <div className="detail-grid">
          <div>
            <h3>Instructor</h3>
            <p>{course.instructor}</p>
          </div>
          <div>
            <h3>Category</h3>
            <p>{course.category}</p>
          </div>
          <div>
            <h3>Duration</h3>
            <p>{course.duration}</p>
          </div>
          <div>
            <h3>Lessons</h3>
            <p>{course.lessons}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseDetailsPage
