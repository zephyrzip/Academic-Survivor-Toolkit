import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'

function AssignmentsPage() {
  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <PageHeader eyebrow="Module" title="Assignments" description="Organize workstreams and submission status." />
      <div className="empty-state">
        <h3>Assignments module ready</h3>
        <p>Track pending deliverables from this dedicated view.</p>
      </div>
    </motion.section>
  )
}

export default AssignmentsPage
