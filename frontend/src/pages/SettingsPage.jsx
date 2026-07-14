import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'

function SettingsPage() {
  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <PageHeader eyebrow="Module" title="Settings" description="Manage preferences and application defaults." />
      <div className="empty-state">
        <h3>Preferences ready</h3>
        <p>Configure your Student Logger experience from here.</p>
      </div>
    </motion.section>
  )
}

export default SettingsPage
