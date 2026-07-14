import { useEffect, useMemo, useState } from 'react'
import { loadStudents, saveStudents } from '../utils/storage'

const INITIAL_STUDENTS = [
  {
    id: 'student-1',
    name: 'Ayesha Khan',
    course: 'Mathematics',
    email: 'ayesha@example.com',
    grade: 92,
    attendance: 96,
    status: 'active',
    notes: 'Excellent problem-solving skills.',
  },
  {
    id: 'student-2',
    name: 'Daniel Ortiz',
    course: 'Physics',
    email: 'daniel@example.com',
    grade: 86,
    attendance: 88,
    status: 'active',
    notes: 'Needs more practice in labs.',
  },
  {
    id: 'student-3',
    name: 'Mina Patel',
    course: 'English',
    email: 'mina@example.com',
    grade: 79,
    attendance: 82,
    status: 'review',
    notes: 'Improving steadily with writing tasks.',
  },
]

export function useStudents() {
  const [students, setStudents] = useState(() => {
    const storedStudents = loadStudents()
    return storedStudents.length > 0 ? storedStudents : INITIAL_STUDENTS
  })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    saveStudents(students)
  }, [students])

  const filteredStudents = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return students.filter((student) => {
      const matchesSearch =
        !keyword ||
        [student.name, student.course, student.email, student.notes]
          .join(' ')
          .toLowerCase()
          .includes(keyword)

      const matchesStatus = statusFilter === 'all' || student.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter, students])

  const stats = useMemo(() => {
    const total = students.length
    const averageGrade = total
      ? Math.round(students.reduce((sum, student) => sum + student.grade, 0) / total)
      : 0
    const averageAttendance = total
      ? Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / total)
      : 0
    const active = students.filter((student) => student.status === 'active').length

    return { total, averageGrade, averageAttendance, active }
  }, [students])

  const addStudent = (student) => {
    setStudents((currentStudents) => [
      {
        id: crypto.randomUUID(),
        ...student,
      },
      ...currentStudents,
    ])
  }

  const updateStudent = (id, updates) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) => (student.id === id ? { ...student, ...updates } : student)),
    )
  }

  const removeStudent = (id) => {
    setStudents((currentStudents) => currentStudents.filter((student) => student.id !== id))
  }

  return {
    students: filteredStudents,
    stats,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    addStudent,
    updateStudent,
    removeStudent,
  }
}
