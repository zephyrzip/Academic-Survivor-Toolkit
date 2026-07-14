import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import AttendanceChart from '../components/AttendanceChart'
import AttendanceHistoryTable from '../components/AttendanceHistoryTable'
import AttendanceProgress from '../components/AttendanceProgress'
import AttendanceStats from '../components/AttendanceStats'
import CourseAttendanceSidebar from '../components/CourseAttendanceSidebar'
import EmptyAttendanceState from '../components/EmptyAttendanceState'
import TeacherAttendancePanel from '../components/TeacherAttendancePanel'
import { createAttendance, fetchAttendance } from '../services/attendanceApi'
import { buildAttendanceChartData, calculateAttendanceMetrics } from '../utils/attendanceUtils'

function getInitialFormState(courses) {
  const today = new Date().toISOString().slice(0, 10)
  return {
    courseId: courses[0] ? String(courses[0].id) : '',
    studentId: '',
    date: today,
    status: 'Present',
    remarks: '',
  }
}

function AttendancePage({ courses = [], students = [] }) {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ course: 'all', month: 'all', status: 'all', dateRange: 'all' })
  const [page, setPage] = useState(1)
  const [range, setRange] = useState('month')
  const [role, setRole] = useState('student')
  const [formData, setFormData] = useState(() => getInitialFormState(courses))
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadAttendance() {
      setLoading(true)
      const data = await fetchAttendance()
      setAttendanceRecords(data)
      setLoading(false)
    }

    loadAttendance()
  }, [])

  useEffect(() => {
    if (courses.length && !selectedCourse) {
      setSelectedCourse(courses[0])
      setFormData((current) => ({ ...current, courseId: String(courses[0].id) }))
      return
    }

    if (selectedCourse && !courses.some((course) => Number(course.id) === Number(selectedCourse.id))) {
      setSelectedCourse(courses[0] ?? null)
    }
  }, [courses, selectedCourse])

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesCourse = filter.course === 'all' || Number(record.courseId) === Number(filter.course)
      const matchesMonth = filter.month === 'all' || new Date(record.date).toLocaleString('default', { month: 'long' }).toLowerCase() === filter.month.toLowerCase()
      const matchesStatus = filter.status === 'all' || record.status.toLowerCase() === filter.status.toLowerCase()
      const matchesDateRange = filter.dateRange === 'all' || record.date >= filter.dateRange

      return matchesCourse && matchesMonth && matchesStatus && matchesDateRange
    })
  }, [attendanceRecords, filter])

  const courseRecords = useMemo(() => {
    return filteredRecords.filter((record) => Number(record.courseId) === Number(selectedCourse?.id))
  }, [filteredRecords, selectedCourse])

  const metrics = useMemo(() => {
    const attended = courseRecords.filter((record) => ['Present', 'Late'].includes(record.status)).length
    const missed = courseRecords.filter((record) => record.status === 'Absent').length
    const total = courseRecords.length
    return calculateAttendanceMetrics({ attended, missed, total, target: 85 })
  }, [courseRecords])

  const sidebarCourses = useMemo(() => {
    return courses.map((course) => {
      const courseAttendanceRecords = attendanceRecords.filter((record) => Number(record.courseId) === Number(course.id))
      const attended = courseAttendanceRecords.filter((record) => ['Present', 'Late'].includes(record.status)).length
      const total = courseAttendanceRecords.length
      const percentage = total ? Math.round((attended / total) * 100) : 0

      return {
        ...course,
        attendance: percentage,
      }
    })
  }, [attendanceRecords, courses])

  const chartHistory = useMemo(() => buildAttendanceChartData(courseRecords, range), [courseRecords, range])

  const handleSelectCourse = (course) => {
    setSelectedCourse(course)
    setFormData((current) => ({ ...current, courseId: String(course.id) }))
    setPage(1)
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleCreateAttendanceRecord = async (event) => {
    event.preventDefault()

    const course = courses.find((item) => Number(item.id) === Number(formData.courseId)) || selectedCourse
    if (!course) {
      return
    }

    const student = students.find((item) => String(item.id) === String(formData.studentId))
    const courseAttendanceRecords = attendanceRecords.filter((record) => Number(record.courseId) === Number(course.id))
    const attended = courseAttendanceRecords.filter((record) => ['Present', 'Late'].includes(record.status)).length
    const total = courseAttendanceRecords.length
    const nextTotal = total + 1
    const nextAttended = attended + (formData.status === 'Present' || formData.status === 'Late' ? 1 : 0)
    const attendancePercentage = nextTotal ? Math.round((nextAttended / nextTotal) * 100) : 0

    setSubmitting(true)
    const created = await createAttendance({
      courseId: Number(course.id),
      courseName: course.title || course.name,
      courseCode: course.code,
      studentId: student?.id || formData.studentId,
      studentName: student?.name || 'Student',
      date: formData.date,
      status: formData.status,
      attendance: attendancePercentage,
      remarks: formData.remarks || `Marked ${formData.status.toLowerCase()}`,
    })

    setAttendanceRecords((current) => [created, ...current])
    setFormData((current) => ({ ...current, remarks: '', studentId: '', date: new Date().toISOString().slice(0, 10), status: 'Present' }))
    setPage(1)
    setSubmitting(false)
  }

  return (
    <motion.section className="attendance-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="attendance-header">
        <div>
          <p className="eyebrow">Attendance</p>
          <h2>Track and manage your class attendance for every course.</h2>
        </div>
        <div className="attendance-header__actions">
          <div className="role-toggle" role="tablist" aria-label="Attendance view role">
            <button type="button" className={`role-toggle__button${role === 'student' ? ' is-active' : ''}`} onClick={() => setRole('student')}>
              Student view
            </button>
            <button type="button" className={`role-toggle__button${role === 'teacher' ? ' is-active' : ''}`} onClick={() => setRole('teacher')}>
              Teacher workflow
            </button>
          </div>
          <span className="eyebrow">{role === 'student' ? 'Read-only student view' : 'Teacher can submit attendance records'}</span>
        </div>
      </div>

      <div className="attendance-layout">
        <CourseAttendanceSidebar courses={sidebarCourses} selectedCourse={selectedCourse} onSelectCourse={handleSelectCourse} />
        <div className="attendance-main">
          <div className="attendance-toolbar">
            <label>
              <span>Course</span>
              <select value={filter.course} onChange={(event) => setFilter((current) => ({ ...current, course: event.target.value }))}>
                <option value="all">All courses</option>
                {sidebarCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Month</span>
              <select value={filter.month} onChange={(event) => setFilter((current) => ({ ...current, month: event.target.value }))}>
                <option value="all">All months</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </label>
            <label>
              <span>Status</span>
              <select value={filter.status} onChange={(event) => setFilter((current) => ({ ...current, status: event.target.value }))}>
                <option value="all">All statuses</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="excused">Excused</option>
              </select>
            </label>
            <label>
              <span>Date range</span>
              <input type="date" value={filter.dateRange} onChange={(event) => setFilter((current) => ({ ...current, dateRange: event.target.value }))} />
            </label>
          </div>

          {loading ? (
            <div className="loading-state">Loading attendance records…</div>
          ) : courseRecords.length === 0 ? (
            <>
              <EmptyAttendanceState onMarkFirstAttendance={() => setRole('teacher')} />
              {role === 'teacher' && (
                <TeacherAttendancePanel
                  courses={sidebarCourses}
                  students={students}
                  formData={formData}
                  onChange={handleFormChange}
                  onSubmit={handleCreateAttendanceRecord}
                  submitting={submitting}
                />
              )}
            </>
          ) : (
            <>
              <div className="attendance-metrics-grid">
                <AttendanceStats metrics={metrics} />
                <AttendanceProgress percentage={metrics.percentage} />
              </div>

              <div className="attendance-secondary-grid">
                <div className="metric-card">
                  <span>Target Attendance</span>
                  <strong>{metrics.target}%</strong>
                </div>
                <div className="metric-card">
                  <span>Minimum Required Attendance</span>
                  <strong>{Math.max(75, Math.min(85, metrics.percentage - 5))}%</strong>
                </div>
                <div className="metric-card">
                  <span>Classes Needed to Reach Target</span>
                  <strong>{metrics.classesNeeded}</strong>
                </div>
                <div className="metric-card">
                  <span>Classes You Can Still Miss</span>
                  <strong>{metrics.classesCanMiss}</strong>
                </div>
              </div>

              <div className="attendance-chart-row">
                <div className="attendance-chart-controls">
                  <button type="button" className={`secondary-btn${range === 'week' ? ' is-active' : ''}`} onClick={() => setRange('week')}>
                    Last Week
                  </button>
                  <button type="button" className={`secondary-btn${range === 'month' ? ' is-active' : ''}`} onClick={() => setRange('month')}>
                    Last Month
                  </button>
                  <button type="button" className={`secondary-btn${range === 'semester' ? ' is-active' : ''}`} onClick={() => setRange('semester')}>
                    This Semester
                  </button>
                </div>
                <AttendanceChart history={chartHistory} range={range} />
              </div>

              <AttendanceHistoryTable rows={courseRecords} page={page} setPage={setPage} pageSize={4} />

              {role === 'teacher' && (
                <TeacherAttendancePanel
                  courses={sidebarCourses}
                  students={students}
                  formData={formData}
                  onChange={handleFormChange}
                  onSubmit={handleCreateAttendanceRecord}
                  submitting={submitting}
                />
              )}
            </>
          )}
        </div>
      </div>
    </motion.section>
  )
}

export default AttendancePage
