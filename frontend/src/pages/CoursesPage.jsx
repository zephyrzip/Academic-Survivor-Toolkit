import { useEffect, useState } from 'react'
import CourseForm from '../components/CourseForm'
import CourseList from '../components/CourseList'
import LoadingState from '../components/LoadingState'
import { fetchCourses } from '../services/coursesApi'

function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCourses() {
      try {
        const data = await fetchCourses(4)
        if (isMounted) {
          setCourses(data)
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

    loadCourses()

    return () => {
      isMounted = false
    }
  }, [])

  const addCourse = (courseData) => {
    setCourses((currentCourses) => [
      {
        id: Date.now(),
        rating: '4.8',
        ...courseData,
      },
      ...currentCourses,
    ])
  }

  const removeCourse = (id) => {
    setCourses((currentCourses) => currentCourses.filter((course) => course.id !== id))
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Learning hub</p>
          <h2>Courses</h2>
        </div>
        <p>Browse courses in English, add new ones, and remove those you no longer need.</p>
      </div>

      <div className="course-layout">
        <CourseForm onSubmit={addCourse} />

        <div className="course-content">
          {loading ? <LoadingState message="Loading courses..." /> : null}
          {error ? <div className="error-state">{error}</div> : null}
          {!loading && !error ? <CourseList courses={courses} onRemove={removeCourse} /> : null}
        </div>
      </div>
    </section>
  )
}

export default CoursesPage
