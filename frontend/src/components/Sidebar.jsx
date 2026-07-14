import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '◉' },
  { to: '/students/manage', label: 'Students', icon: '◌' },
  { to: '/courses/manage', label: 'Courses', icon: '◍' },
  { to: '/attendance', label: 'Attendance', icon: '◐' },
  { to: '/gpa', label: 'GPA', icon: '◑' },
  { to: '/planner', label: 'Planner', icon: '◒' },
  { to: '/countdown', label: 'Countdown', icon: '◓' },
  { to: '/assignments', label: 'Assignments', icon: '◔' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-mark">SL</div>
        <div>
          <p className="eyebrow">Academic suite</p>
          <h2>Student Logger</h2>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar__link${isActive ? ' is-active' : ''}`}
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
