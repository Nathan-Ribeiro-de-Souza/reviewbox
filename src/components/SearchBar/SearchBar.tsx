import type { SubmitEvent } from 'react'

import './SearchBar.css'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search movies...'
}: SearchBarProps) {
  
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />

      {onSubmit && (
        <button type="submit">
          Search
        </button>
      )}
    </form>
  )
}