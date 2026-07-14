import { motion } from 'framer-motion'

function EmptyAttendanceState({ onMarkFirstAttendance }) {
  return (
    <motion.div className="empty-state empty-state--attendance" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="empty-state__icon">📚</div>
      <h3>No attendance records yet.</h3>
      <p>Start tracking your class sessions and keep your academic progress visible.</p>
      <button type="button" className="primary-btn" onClick={onMarkFirstAttendance}>
        Mark First Attendance
      </button>
    </motion.div>
  )
}

export default EmptyAttendanceState
