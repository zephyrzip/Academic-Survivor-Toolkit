import StudentCard from './StudentCard'

function StudentList({ students, onEdit, onDelete, courses }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <h3>No students found</h3>
        <p>Try another search term or add a new student.</p>
      </div>
    )
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} courses={courses} />
      ))}
    </div>
  )
}

export default StudentList
