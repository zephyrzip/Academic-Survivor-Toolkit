function SearchBar({ value, onChange, placeholder }) {
  return (
    <label className="search-bar">
      <span className="search-bar__icon">⌕</span>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  )
}

export default SearchBar
