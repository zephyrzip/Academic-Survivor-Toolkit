import { motion } from 'framer-motion'

const statusClass = {
  Present: 'badge badge--active',
  Absent: 'badge badge--paused',
  Late: 'badge badge--review',
}

function AttendanceHistoryTable({ rows, page, setPage, pageSize }) {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const pagedRows = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <motion.div className="history-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="history-card__header">
        <h3>Attendance history</h3>
        <div className="history-pagination">
          <button type="button" className="secondary-btn" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} / {totalPages}</span>
          <button type="button" className="secondary-btn" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Course</th>
              <th>Status</th>
              <th>Attendance %</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.courseCode}</td>
                <td><span className={statusClass[row.status] || 'badge'}>{row.status}</span></td>
                <td>{row.attendance}%</td>
                <td>{row.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default AttendanceHistoryTable
