import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar'

function ManageCoursesPage({ courses, onDeleteCourse, loading }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filteredCourses = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return courses.filter((course) => {
      const matchesCategory = category === 'all' || course.category === category
      const matchesSearch =
        !keyword ||
        [course.title, course.description, course.code]
          .join(' ')
          .toLowerCase()
          .includes(keyword)

      return matchesCategory && matchesSearch
    })
  }, [category, courses, search])

  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <PageHeader
        eyebrow="Manage courses"
        title="Existing course catalog"
        description="Browse programs from a focused content view."
        actions={
          <>
            <button type="button" className="secondary-btn" onClick={() => navigate('/dashboard')}>
              Back to dashboard
            </button>
            <button type="button" className="primary-btn" onClick={() => navigate('/courses/create')}>
              Create course
            </button>
          </>
        }
      />

      <div className="toolbar">
        <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses" />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Design">Design</option>
          <option value="Leadership">Leadership</option>
        </select>
      </div>

      {loading ? (
        <div className="course-grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="course-card skeleton-card" />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses yet</h3>
          <p>Create your first course to begin building the catalog.</p>
        </div>
      ) : (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onRemove={onDeleteCourse} />
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default ManageCoursesPage
