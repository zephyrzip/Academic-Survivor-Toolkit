import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'

function GpaPage() {
  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <PageHeader eyebrow="Module" title="GPA" description="Monitor grade performance at a glance." />
      <div className="empty-state">
        <h3>GPA insights coming soon</h3>
        <p>Use this module to surface academic performance summaries.</p>
      </div>
    </motion.section>
  )
}

export default GpaPage
