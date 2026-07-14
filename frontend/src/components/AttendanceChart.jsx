import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'

function AttendanceChart({ history, range }) {
  const filtered = history.filter((item) => {
    if (range === 'week') return item.weekly
    if (range === 'month') return item.monthly
    return item.semester
  })

  const data = filtered.map((item) => ({ name: item.label, attendance: item.attendance }))

  return (
    <motion.div className="chart-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="history-card__header">
        <h3>Attendance trend</h3>
        <div className="history-pagination">
          <span>{range === 'week' ? 'Last Week' : range === 'month' ? 'Last Month' : 'This Semester'}</span>
        </div>
      </div>
      <div className="chart-shell">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis domain={[60, 100]} stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default AttendanceChart
