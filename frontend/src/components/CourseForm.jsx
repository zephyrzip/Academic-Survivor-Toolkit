import { useState } from 'react'

const initialValues = {
  title: '',
  description: '',
  category: 'Technology',
  duration: '6 weeks',
  lessons: '12 lessons',
  level: 'Beginner',
  instructor: 'Alex Morgan',
}

function CourseForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialValues)
  const [saved, setSaved] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      return
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    })

    setSaved(true)
    setFormData(initialValues)
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h3>Add a new course</h3>
        <p>Create a course in English with clear details.</p>
      </div>

      <label>
        Course title
        <input name="title" value={formData.title} onChange={handleChange} required />
      </label>

      <label>
        Description
        <textarea name="description" rows="3" value={formData.description} onChange={handleChange} required />
      </label>

      <div className="inline-fields">
        <label>
          Category
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
            <option value="Leadership">Leadership</option>
          </select>
        </label>

        <label>
          Level
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>
      </div>

      <div className="inline-fields">
        <label>
          Duration
          <input name="duration" value={formData.duration} onChange={handleChange} />
        </label>

        <label>
          Lessons
          <input name="lessons" value={formData.lessons} onChange={handleChange} />
        </label>
      </div>

      <label>
        Instructor
        <input name="instructor" value={formData.instructor} onChange={handleChange} />
      </label>

      {saved ? <p className="success-message">Course created successfully.</p> : null}

      <button type="submit" className="primary-btn">
        Save Course
      </button>
    </form>
  )
}

export default CourseForm
