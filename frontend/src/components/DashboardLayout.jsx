import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'

function getBreadcrumbs(pathname) {
  if (pathname === '/' || pathname === '/dashboard') {
    return [{ label: 'Dashboard', to: '/dashboard' }]
  }

  if (pathname.startsWith('/students')) {
    return [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Students', to: '/students/manage' },
      { label: pathname.endsWith('/create') ? 'Create Student' : 'Manage Students' },
    ]
  }

  if (pathname.startsWith('/courses')) {
    return [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Courses', to: '/courses/manage' },
      { label: pathname.endsWith('/create') ? 'Create Course' : 'Manage Courses' },
    ]
  }

  const moduleMap = {
    '/attendance': [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Attendance' }],
    '/gpa': [{ label: 'Dashboard', to: '/dashboard' }, { label: 'GPA' }],
    '/planner': [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Planner' }],
    '/countdown': [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Countdown' }],
    '/assignments': [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Assignments' }],
    '/settings': [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Settings' }],
  }

  return moduleMap[pathname] || [{ label: 'Dashboard', to: '/dashboard' }]
}

function DashboardLayout({ theme, onToggleTheme }) {
  const location = useLocation()
  const breadcrumbs = getBreadcrumbs(location.pathname)

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <TopNavbar breadcrumbs={breadcrumbs} theme={theme} onToggleTheme={onToggleTheme} />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
