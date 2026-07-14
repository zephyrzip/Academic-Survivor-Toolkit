const STORAGE_KEY = 'student-logger-students'

export function loadStudents() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    if (!storedValue) {
      return []
    }

    const parsed = JSON.parse(storedValue)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveStudents(students) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
}
