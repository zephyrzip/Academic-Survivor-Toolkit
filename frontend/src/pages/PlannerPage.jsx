import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'

function PlannerPage() {
  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <PageHeader eyebrow="Module" title="Planner" description="Coordinate schedules, deadlines, and learning milestones." />
      <div className="empty-state">
        <h3>Planner workspace ready</h3>
        <p>This space can host upcoming tasks and weekly plans.</p>
      </div>
    </motion.section>
  )
}

export default PlannerPage
