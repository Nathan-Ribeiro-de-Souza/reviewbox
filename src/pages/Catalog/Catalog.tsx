import { useEffect, useState, type ChangeEvent } from 'react'

import { SearchBar } from '../../components/SearchBar/SearchBar'
import { CatalogFilters } from './components/CatalogFilters/CatalogFilters'
import { CatalogMovieGrid } from './components/MovieCardsCatalog/CatalogMovieGrid'
import { CatalogSerieGrid } from './components/SerieCardsCatalog/CatalogSerieGrid'

import {
  getCatalogMovies,
  getCatalogSeries,
  getMovieGenres,
  getSeriesGenres,
  searchMovies,
  searchSeries,
} from '../../services/tmdbApi'

import type { Genre, Movie, TVSeries } from '../../types/ApiTypes'

import './Catalog.css'

export function Catalog() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [series, setSeries] = useState<TVSeries[]>([])

  const [movieGenres, setMovieGenres] = useState<Genre[]>([])
  const [, setSeriesGenres] = useState<Genre[]>([])

  const [searchQuery, setSearchQuery] = useState('')

  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadGenres() {
      try {
        const [movieGenreList, seriesGenreList] = await Promise.all([
          getMovieGenres(),
          getSeriesGenres()
        ])

        setMovieGenres(movieGenreList)
        setSeriesGenres(seriesGenreList)
      } catch {
        setErrorMessage('Failed to load genres.')
      }
    }

    loadGenres()
  }, [])

  useEffect(() => {
    async function loadCatalogResults() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const trimmedSearch = searchQuery.trim()

        if (trimmedSearch !== '') {
          const [searchedMovies, searchedSeries] = await Promise.all([
            searchMovies(trimmedSearch),
            searchSeries(trimmedSearch)
          ])

          setMovies(searchedMovies)
          setSeries(searchedSeries)
          return
        }

        const [catalogMovies, catalogSeries] = await Promise.all([
          getCatalogMovies({
            genreId: selectedGenreId,
            year: selectedYear,
            rating: selectedRating
          }),
          getCatalogSeries({
            genreId: selectedGenreId,
            year: selectedYear,
            rating: selectedRating
          })
        ])

        setMovies(catalogMovies)
        setSeries(catalogSeries)
      } catch {
        setErrorMessage('Failed to load catalog results.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCatalogResults()
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

  function getMovieGenreNamesByIds(genreIds: number[]) {
    return genreIds
      .map((id) => movieGenres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(', ')
  }

  const shouldShowEmptyState =
    !isLoading && !errorMessage && movies.length === 0 && series.length === 0

  const shouldShowMovies = !isLoading && !errorMessage && movies.length > 0
  const shouldShowSeries = !isLoading && !errorMessage && series.length > 0

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <p className="section-label">Catalog</p>
        <h1>Find your next story.</h1>
        <p>Search, filter and explore movies and series from TMDB.</p>
      </section>

      <section className="catalog-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <CatalogFilters
          genres={movieGenres}
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
          <p className="status-message">No results found.</p>
        )}

        {shouldShowMovies && (
          <section className="catalog-media-section">
            <div className="section-header">
              <p className="section-label">Movies</p>
              <h2>Movies</h2>
            </div>

            <CatalogMovieGrid
              movies={movies}
              getGenreNamesByIds={getMovieGenreNamesByIds}
            />
          </section>
        )}

        {shouldShowSeries && (
          <section className="catalog-media-section">
            <div className="section-header">
              <p className="section-label">Series</p>
              <h2>Series</h2>
            </div>

            <CatalogSerieGrid
              series={series}
              getGenreNameByIds={getMovieGenreNamesByIds}
            />
          </section>
        )}
      </section>
    </main>
  )
}