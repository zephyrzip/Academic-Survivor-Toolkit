function SummaryPanel({ stats }) {
  return (
    <section className="summary-panel">
      <div>
        <h2>Student Logger</h2>
        <p>Track learner progress and keep your class overview in one place.</p>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <strong>{stats.total}</strong>
          <span>Total students</span>
        </div>
        <div className="summary-card">
          <strong>{stats.averageGrade}%</strong>
          <span>Avg grade</span>
        </div>
        <div className="summary-card">
          <strong>{stats.averageAttendance}%</strong>
          <span>Avg attendance</span>
        </div>
        <div className="summary-card">
          <strong>{stats.active}</strong>
          <span>Active learners</span>
        </div>
      </div>
    </section>
  )
}

export default SummaryPanel
