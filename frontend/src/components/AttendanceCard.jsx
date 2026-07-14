import { motion } from 'framer-motion'

function AttendanceCard({ course, isActive, onSelect }) {
  return (
    <motion.button
      type="button"
      className={`attendance-card${isActive ? ' is-active' : ''}`}
      onClick={() => onSelect(course)}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="attendance-card__info">
        <h3>{course.name}</h3>
        <p>{course.code}</p>
      </div>
      <div className="attendance-card__meta">
        <span>{course.attendance}%</span>
        <div className="attendance-ring attendance-ring--small" style={{ '--progress': `${course.attendance}%` }} />
      </div>
    </motion.button>
  )
}

export default AttendanceCard
