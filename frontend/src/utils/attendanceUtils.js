export function calculateAttendanceMetrics({ attended, missed, total, target = 85 }) {
  const safeTotal = Math.max(total, attended + missed)
  const safeAttended = Math.min(attended, safeTotal)
  const safeMissed = Math.max(0, safeTotal - safeAttended)
  const percentage = safeTotal ? Math.round((safeAttended / safeTotal) * 100) : 0
  const minimumRequired = Math.max(0, Math.ceil((target / 100) * safeTotal) - safeAttended)
  const classesNeeded = Math.max(0, minimumRequired)
  const classesCanMiss = Math.max(0, safeTotal - safeAttended - Math.max(0, minimumRequired - 1))

  return {
    percentage,
    attended: safeAttended,
    missed: safeMissed,
    total: safeTotal,
    target,
    classesNeeded,
    classesCanMiss,
  }
}

export function buildAttendanceChartData(records, range = 'month') {
  const sortedRecords = [...records].sort((left, right) => new Date(left.date) - new Date(right.date))

  if (!sortedRecords.length) {
    return []
  }

  const lastDate = new Date(sortedRecords[sortedRecords.length - 1].date)

  if (range === 'week') {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(lastDate)
      date.setDate(lastDate.getDate() - (6 - index))
      const key = date.toISOString().slice(0, 10)
      const dayRecords = sortedRecords.filter((record) => record.date === key)
      const attendance = dayRecords.length
        ? Math.round(dayRecords.reduce((sum, record) => sum + Number(record.attendance || 0), 0) / dayRecords.length)
        : 0

      return {
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        attendance,
        weekly: true,
      }
    })
  }

  if (range === 'month') {
    return Array.from({ length: 4 }, (_, index) => {
      const start = new Date(lastDate)
      start.setDate(lastDate.getDate() - (3 - index) * 7)
      const end = new Date(start)
      end.setDate(start.getDate() + 6)
      const weekRecords = sortedRecords.filter((record) => {
        const date = new Date(record.date)
        return date >= start && date <= end
      })
      const attendance = weekRecords.length
        ? Math.round(weekRecords.reduce((sum, record) => sum + Number(record.attendance || 0), 0) / weekRecords.length)
        : 0

      return {
        label: `W${index + 1}`,
        attendance,
        monthly: true,
      }
    })
  }

  const semesterMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return semesterMonths.map((month, index) => {
    const monthRecords = sortedRecords.filter((record) => new Date(record.date).getMonth() === index)
    const attendance = monthRecords.length
      ? Math.round(monthRecords.reduce((sum, record) => sum + Number(record.attendance || 0), 0) / monthRecords.length)
      : 0

    return {
      label: month,
      attendance,
      semester: true,
    }
  })
}

export function getStatusTone(value) {
  if (value >= 85) return 'good'
  if (value >= 75) return 'warning'
  return 'danger'
}
