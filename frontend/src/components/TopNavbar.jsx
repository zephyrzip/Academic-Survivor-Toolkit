import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function TopNavbar({ breadcrumbs, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="topbar__breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`} className="topbar__crumb">
            {index > 0 ? ' / ' : ''}
            {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
          </span>
        ))}
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}

export default TopNavbar
