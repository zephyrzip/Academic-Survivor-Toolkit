import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardLayout from './components/DashboardLayout'
import CreateCoursePage from './pages/CreateCoursePage'
import CreateStudentPage from './pages/CreateStudentPage'
import DashboardPage from './pages/DashboardPage'
import AttendancePage from './pages/AttendancePage'
import GpaPage from './pages/GpaPage'
import PlannerPage from './pages/PlannerPage'
import CountdownPage from './pages/CountdownPage'
import AssignmentsPage from './pages/AssignmentsPage'
import SettingsPage from './pages/SettingsPage'
import CourseDetailsPage from './pages/CourseDetailsPage'
import ManageCoursesPage from './pages/ManageCoursesPage'
import ManageStudentsPage from './pages/ManageStudentsPage'
import { useStudents } from './hooks/useStudents'
import { fetchCourses } from './services/coursesApi'

function App() {
  const {
    students,
    stats,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    addStudent,
    updateStudent,
    removeStudent,
  } = useStudents()

  const [courses, setCourses] = useState([])
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    return window.localStorage.getItem('student-logger-theme') || 'light'
  })

  useEffect(() => {
    async function loadCourses() {
      const courseData = await fetchCourses()
      setCourses(courseData)
    }

    loadCourses()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('student-logger-theme', theme)
  }, [theme])

  const handleCreateStudent = (studentData) => {
    addStudent(studentData)
  }

  const handleCreateCourse = (courseData) => {
    setCourses((currentCourses) => [
      {
        id: Date.now(),
        progress: 0,
        gpa: '3.0',
        ...courseData,
      },
      ...currentCourses,
    ])
  }

  const handleDeleteCourse = (courseId) => {
    setCourses((currentCourses) => currentCourses.filter((course) => course.id !== courseId))
  }

  const handleDeleteStudent = (studentId) => {
    removeStudent(studentId)
  }

  return (
    <main className="app-shell">
      <Routes>
        <Route element={<DashboardLayout theme={theme} onToggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage stats={stats} />} />
          <Route
            path="/students/manage"
            element={
              <ManageStudentsPage
                students={students}
                onDeleteStudent={handleDeleteStudent}
                courses={courses}
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            }
          />
          <Route path="/students/create" element={<CreateStudentPage onCreateStudent={handleCreateStudent} courses={courses} />} />
          <Route path="/courses/manage" element={<ManageCoursesPage courses={courses} onDeleteCourse={handleDeleteCourse} />} />
          <Route path="/courses/create" element={<CreateCoursePage onCreateCourse={handleCreateCourse} />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/attendance" element={<AttendancePage courses={courses} students={students} />} />
          <Route path="/gpa" element={<GpaPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
