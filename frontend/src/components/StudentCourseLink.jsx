function StudentCourseLink({ student, courses }) {
  const enrolledCourse = courses.find((course) => course.code === student.courseCode)

  return (
    <div className="student-course-link">
      <span>Enrolled course</span>
      <strong>{enrolledCourse ? enrolledCourse.title : student.course}</strong>
    </div>
  )
}

export default StudentCourseLink
