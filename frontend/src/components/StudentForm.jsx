import { useEffect, useState } from 'react'

const emptyForm = {
  name: '',
  course: '',
  courseCode: '',
  email: '',
  grade: '',
  attendance: '',
  status: 'active',
  notes: '',
}

function StudentForm({ onSubmit, initialStudent, onCancel, courses }) {
  const [formData, setFormData] = useState(emptyForm)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (initialStudent) {
      setFormData({
        ...initialStudent,
        grade: String(initialStudent.grade),
        attendance: String(initialStudent.attendance),
        courseCode: initialStudent.courseCode || '',
      })
      return
    }

    setFormData(emptyForm)
  }, [initialStudent])

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'courseCode') {
      const selectedCourse = courses.find((course) => course.code === value)
      setFormData((currentData) => ({
        ...currentData,
        courseCode: value,
        course: selectedCourse ? selectedCourse.title : '',
      }))
      return
    }

    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      return
    }

    onSubmit({
      name: formData.name.trim(),
      course: formData.course.trim(),
      courseCode: formData.courseCode,
      email: formData.email.trim(),
      grade: Number(formData.grade),
      attendance: Number(formData.attendance),
      status: formData.status,
      notes: formData.notes.trim(),
    })

    setSaved(true)
    setFormData(emptyForm)
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>{initialStudent ? 'Edit student' : 'Add a student'}</h2>
        <p>{initialStudent ? 'Update the record below.' : 'Log a new student profile.'}</p>
      </div>

      <label>
        Name
        <input name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        Select course
        <select name="courseCode" value={formData.courseCode} onChange={handleChange}>
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.code} value={course.code}>
              {course.code} - {course.title}
            </option>
          ))}
        </select>
      </label>

      <label>
        Email
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />
      </label>

      <div className="inline-fields">
        <label>
          Grade
          <input name="grade" type="number" min="0" max="100" value={formData.grade} onChange={handleChange} required />
        </label>

        <label>
          Attendance %
          <input name="attendance" type="number" min="0" max="100" value={formData.attendance} onChange={handleChange} required />
        </label>
      </div>

      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="review">Review</option>
          <option value="paused">Paused</option>
        </select>
      </label>

      <label>
        Notes
        <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} />
      </label>

      <div className="form-actions">
        {saved ? <p className="success-message">Student created successfully.</p> : null}
        <button type="submit" className="primary-btn">
          {initialStudent ? 'Save changes' : 'Save Student'}
        </button>
        {initialStudent ? (
          <button type="button" className="secondary-btn" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default StudentForm
