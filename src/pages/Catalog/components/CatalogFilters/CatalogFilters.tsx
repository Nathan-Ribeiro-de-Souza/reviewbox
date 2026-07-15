import type { ChangeEvent } from 'react'

import type { Genre } from '../../../../types/ApiTypes'

import './CatalogFilters.css'

type CatalogFiltersProps = {
  genres: Genre[]
  selectedGenreId: number | null
  selectedRating: string | null
  selectedYear: string | null
  onGenreChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onRatingChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onYearChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const ratingOptions = [10, 9, 8, 7, 6, 5, 4, 3]
const currentYear = new Date().getFullYear()

export function CatalogFilters({
  genres,
  selectedGenreId,
  selectedRating,
  selectedYear,
  onGenreChange,
  onRatingChange,
  onYearChange
}: CatalogFiltersProps) {
  
  return (
    <div className="catalog-filters">
      <select value={selectedGenreId ?? ''} onChange={onGenreChange}>
        <option value="">All genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <select value={selectedRating ?? ''} onChange={onRatingChange}>
        <option value="">All ratings</option>

        {ratingOptions.map((rating) => (
          <option key={rating} value={rating}>
            {rating}+
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Year"
        min="1887"
        max={currentYear}
        value={selectedYear ?? ''}
        onChange={onYearChange}
      />
    </div>
  )
}