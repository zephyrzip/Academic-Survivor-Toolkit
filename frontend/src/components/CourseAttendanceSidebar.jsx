import { motion } from 'framer-motion'
import AttendanceCard from './AttendanceCard'

function CourseAttendanceSidebar({ courses, selectedCourse, onSelectCourse }) {
  return (
    <motion.aside className="course-sidebar" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
      <div className="sidebar-heading">
        <p className="eyebrow">Courses</p>
        <h3>Enrolled courses</h3>
      </div>
      <div className="course-sidebar__list">
        {courses.map((course) => (
          <AttendanceCard key={course.id} course={course} isActive={selectedCourse?.id === course.id} onSelect={onSelectCourse} />
        ))}
      </div>
    </motion.aside>
  )
}

export default CourseAttendanceSidebar
