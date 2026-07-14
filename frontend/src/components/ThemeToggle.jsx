function ThemeToggle({ theme, onToggle }) {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-pressed={theme === 'dark'}>
      {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
    </button>
  )
}

export default ThemeToggle
