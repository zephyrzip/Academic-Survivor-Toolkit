import { motion } from 'framer-motion'
import SummaryPanel from '../components/SummaryPanel'
import { Link } from 'react-router-dom'

function DashboardPage({ stats }) {
  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="page-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Academic operations</h2>
          <p className="page-heading__description">Switch modules from the sidebar to focus on one workspace at a time.</p>
        </div>
      </div>

      <SummaryPanel stats={stats} />

      <div className="dashboard-cards">
        <Link to="/students/manage" className="dashboard-card">
          <h3>Students</h3>
          <p>Maintain learner records and enrollment.</p>
        </Link>
        <Link to="/courses/manage" className="dashboard-card">
          <h3>Courses</h3>
          <p>Review the academic catalog and course progress.</p>
        </Link>
        <Link to="/planner" className="dashboard-card">
          <h3>Planner</h3>
          <p>Organize milestones and upcoming tasks.</p>
        </Link>
      </div>
    </motion.section>
  )
}

export default DashboardPage
