import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'

function CountdownPage() {
  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <PageHeader eyebrow="Module" title="Countdown" description="Highlight upcoming deadlines and academic milestones." />
      <div className="empty-state">
        <h3>Countdown module ready</h3>
        <p>Display your next important event here with a polished card.</p>
      </div>
    </motion.section>
  )
}

export default CountdownPage
