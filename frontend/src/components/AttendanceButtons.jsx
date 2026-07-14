import { motion } from 'framer-motion'

function AttendanceButtons({ onMarkPresent, onMarkAbsent, loading }) {
  return (
    <div className="attendance-actions">
      <motion.button
        type="button"
        className="attendance-action attendance-action--present"
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        onClick={onMarkPresent}
        disabled={loading}
      >
        {loading ? 'Saving…' : '✅ Present'}
      </motion.button>
      <motion.button
        type="button"
        className="attendance-action attendance-action--absent"
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        onClick={onMarkAbsent}
        disabled={loading}
      >
        {loading ? 'Saving…' : '❌ Absent'}
      </motion.button>
    </div>
  )
}

export default AttendanceButtons
