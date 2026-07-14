import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import CourseForm from '../components/CourseForm'

function CreateCoursePage({ onCreateCourse }) {
  const navigate = useNavigate()

  const handleSubmit = (courseData) => {
    onCreateCourse(courseData)
    navigate('/courses')
  }

  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="page-heading">
        <div>
          <p className="eyebrow">Create course</p>
          <h2>New academic program</h2>
        </div>
        <button type="button" className="secondary-btn" onClick={() => navigate('/courses')}>
          Cancel
        </button>
      </div>

      <CourseForm onSubmit={handleSubmit} />
    </motion.section>
  )
}

export default CreateCoursePage
