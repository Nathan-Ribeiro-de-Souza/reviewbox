import { useEffect, useState, type ChangeEvent } from 'react'

import { SearchBar } from '../../components/SearchBar/SearchBar'
import { CatalogFilters } from './components/CatalogFilters/CatalogFilters'
import { CatalogMovieGrid } from './components/MovieCardsCatalog/CatalogMovieGrid'

import { getCatalogMovies, getMovieGenres, searchMovies } from '../../services/tmdbApi'

import type { Genre, Movie } from '../../types/ApiTypes'

import './Catalog.css'

export function Catalog() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])

  const [searchQuery, setSearchQuery] = useState('')

  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadGenres() {
      try {
        const genreList = await getMovieGenres()
        setGenres(genreList)
      } catch {
        setErrorMessage('Failed to load genres.')
      }
    }

    loadGenres()
  }, [])

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const trimmedSearch = searchQuery.trim()

        if (trimmedSearch !== '') {
          const searchedMovies = await searchMovies(trimmedSearch)
          setMovies(searchedMovies)
          return
        }

        const catalogMovies = await getCatalogMovies({
          genreId: selectedGenreId,
          year: selectedYear,
          rating: selectedRating
        })

        setMovies(catalogMovies)
      } catch {
        setErrorMessage('Failed to load movies.')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovies()
  }, [searchQuery, selectedGenreId, selectedYear, selectedRating])

  function handleGenreChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value

    setSelectedGenreId(value === '' ? null : Number(value))
  }

  function handleRatingChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value

    setSelectedRating(value === '' ? null : value)
  }

  function handleYearChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    setSelectedYear(value === '' ? null : value)
  }

  function getGenreNamesByIds(genreIds: number[]) {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(', ')
  }

  const shouldShowEmptyState =
    !isLoading && !errorMessage && movies.length === 0

  const shouldShowMovies =
    !isLoading && !errorMessage && movies.length > 0

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <p className="section-label">Catalog</p>
        <h1>Find your next movie.</h1>
        <p>Search, filter and explore movies from TMDB.</p>
      </section>

      <section className="catalog-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <CatalogFilters
          genres={genres}
          selectedGenreId={selectedGenreId}
          selectedRating={selectedRating}
          selectedYear={selectedYear}
          onGenreChange={handleGenreChange}
          onRatingChange={handleRatingChange}
          onYearChange={handleYearChange}
        />
      </section>

      <section className="catalog-results">
        {isLoading && <p className="status-message">Loading...</p>}

        {errorMessage && (
          <p className="status-message status-message-error">
            {errorMessage}
          </p>
        )}

        {shouldShowEmptyState && (
          <p className="status-message">No movies found.</p>
        )}

        {shouldShowMovies && (
          <CatalogMovieGrid
            movies={movies}
            getGenreNamesByIds={getGenreNamesByIds}
          />
        )}
      </section>
    </main>
  )
}