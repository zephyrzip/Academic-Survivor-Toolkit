const STORAGE_KEY = 'student-logger-attendance'

function readAttendanceRecords() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return []
    }

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAttendanceRecords(records) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

function createRecordId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `attendance-${Date.now()}`
}

function normalizeRecord(record) {
  return {
    ...record,
    status: record.status || 'Present',
    attendance: Number(record.attendance) || 0,
  }
}

export async function fetchAttendance() {
  return readAttendanceRecords().map(normalizeRecord)
}

export async function fetchAttendanceByCourse(courseId) {
  const records = readAttendanceRecords()
  return records
    .filter((record) => Number(record.courseId) === Number(courseId))
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .map(normalizeRecord)
}

export async function createAttendance(payload) {
  const record = normalizeRecord({ ...payload, id: createRecordId() })
  const existing = readAttendanceRecords()
  writeAttendanceRecords([record, ...existing])
  return record
}

export async function updateAttendance(id, payload) {
  const existing = readAttendanceRecords()
  const nextRecords = existing.map((record) => (record.id === id ? normalizeRecord({ ...record, ...payload }) : record))
  writeAttendanceRecords(nextRecords)
  return nextRecords.find((record) => record.id === id) || normalizeRecord({ ...payload, id })
}

export async function deleteAttendance(id) {
  const existing = readAttendanceRecords()
  writeAttendanceRecords(existing.filter((record) => record.id !== id))
  return id
}
