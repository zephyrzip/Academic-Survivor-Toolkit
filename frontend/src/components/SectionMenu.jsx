import { NavLink } from 'react-router-dom'

function SectionMenu() {
  return (
    <nav className="section-menu">
      <NavLink to="/students" className="menu-card">
        <span className="menu-card__label">Students</span>
        <strong>Manage learners</strong>
      </NavLink>
      <NavLink to="/courses" className="menu-card">
        <span className="menu-card__label">Courses</span>
        <strong>Manage programs</strong>
      </NavLink>
      <NavLink to="/students/new" className="menu-card">
        <span className="menu-card__label">Add student</span>
        <strong>Create learner</strong>
      </NavLink>
      <NavLink to="/courses/new" className="menu-card">
        <span className="menu-card__label">Add course</span>
        <strong>Create program</strong>
      </NavLink>
    </nav>
  )
}

export default SectionMenu
