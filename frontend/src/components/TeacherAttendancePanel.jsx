import { motion } from 'framer-motion'

function TeacherAttendancePanel({ courses, students, formData, onChange, onSubmit, submitting }) {
  return (
    <motion.div className="teacher-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="history-card__header">
        <h3>Teacher attendance panel</h3>
      </div>
      <form className="teacher-form" onSubmit={onSubmit}>
        <label>
          <span>Course</span>
          <select name="courseId" value={formData.courseId} onChange={onChange} required>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} • {course.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Student</span>
          <select name="studentId" value={formData.studentId} onChange={onChange} required>
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Date</span>
          <input name="date" type="date" value={formData.date} onChange={onChange} required />
        </label>
        <label>
          <span>Status</span>
          <select name="status" value={formData.status} onChange={onChange} required>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Excused">Excused</option>
          </select>
        </label>
        <label>
          <span>Remarks</span>
          <textarea name="remarks" rows="3" value={formData.remarks} onChange={onChange} placeholder="Add remarks from the teacher" />
        </label>
        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save attendance record'}
        </button>
      </form>
    </motion.div>
  )
}

export default TeacherAttendancePanel
