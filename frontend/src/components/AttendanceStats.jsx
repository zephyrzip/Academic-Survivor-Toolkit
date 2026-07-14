import { motion } from 'framer-motion'

function StatTile({ label, value, tone }) {
  return (
    <motion.div className={`stat-tile stat-tile--${tone}`} whileHover={{ y: -3, scale: 1.01 }}>
      <span>{label}</span>
      <strong>{value}</strong>
    </motion.div>
  )
}

function AttendanceStats({ metrics }) {
  return (
    <div className="stats-grid">
      <StatTile label="Attendance Percentage" value={`${metrics.percentage}%`} tone="good" />
      <StatTile label="Classes Attended" value={metrics.attended} tone="good" />
      <StatTile label="Classes Missed" value={metrics.missed} tone="danger" />
      <StatTile label="Total Classes" value={metrics.total} tone="neutral" />
    </div>
  )
}

export default AttendanceStats
