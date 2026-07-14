import CourseCard from './CourseCard'

function CourseList({ courses, onRemove }) {
  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onRemove={onRemove} />
      ))}
    </div>
  )
}

export default CourseList
