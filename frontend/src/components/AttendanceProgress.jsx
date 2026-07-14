import { motion, useSpring } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { getStatusTone } from '../utils/attendanceUtils'

function AttendanceProgress({ percentage }) {
  const [displayValue, setDisplayValue] = useState(0)
  const tone = getStatusTone(percentage)
  const spring = useSpring(0, { stiffness: 70, damping: 20 })

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => setDisplayValue(latest))
    spring.set(percentage)
    return unsubscribe
  }, [percentage, spring])

  const offset = useMemo(() => 283 - (283 * displayValue) / 100, [displayValue])

  return (
    <motion.div className="progress-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="progress-ring-wrapper">
        <svg className="progress-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" className="progress-ring__track" />
          <circle
            cx="60"
            cy="60"
            r="45"
            className={`progress-ring__value progress-ring__value--${tone}`}
            strokeDasharray="283"
            strokeDashoffset={offset}
          />
        </svg>
        <div className="progress-ring__label">
          <strong>{Math.round(displayValue)}%</strong>
          <span>{tone === 'good' ? 'On track' : tone === 'warning' ? 'Needs attention' : 'Below target'}</span>
        </div>
      </div>
      <div className="progress-card__footer">
        <div>
          <span>Target attendance</span>
          <strong>85%</strong>
        </div>
        <div>
          <span>Minimum required</span>
          <strong>75%</strong>
        </div>
      </div>
    </motion.div>
  )
}

export default AttendanceProgress
