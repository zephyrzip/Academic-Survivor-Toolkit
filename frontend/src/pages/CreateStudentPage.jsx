import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm'

function CreateStudentPage({ onCreateStudent, courses }) {
  const navigate = useNavigate()

  const handleSubmit = (studentData) => {
    onCreateStudent(studentData)
    navigate('/students')
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
          <p className="eyebrow">Create student</p>
          <h2>New learner profile</h2>
        </div>
        <button type="button" className="secondary-btn" onClick={() => navigate('/students')}>
          Cancel
        </button>
      </div>

      <StudentForm onSubmit={handleSubmit} onCancel={() => navigate('/students')} courses={courses} />
    </motion.section>
  )
}

export default CreateStudentPage
