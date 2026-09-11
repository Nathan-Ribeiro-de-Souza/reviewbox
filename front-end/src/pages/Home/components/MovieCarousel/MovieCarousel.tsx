import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { formatRating, formatYear } from '../../../../utils/formatters'
import type { Movie } from '../../../../types/ApiTypes'

import './MovieCarousel.css'

type MovieCarouselProps = {
  movies: Movie[]
}

const MOVIES_PER_PAGE = 5
const MOBILE_QUERY = '(max-width: 620px)'

export function MovieCarousel({ movies }: MovieCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY)

    function updateIsMobile() {
      setIsMobile(mediaQuery.matches)
    }

    updateIsMobile()

    mediaQuery.addEventListener('change', updateIsMobile)

    return () => {
      mediaQuery.removeEventListener('change', updateIsMobile)
    }
  }, [])

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE)

  const startIndex = currentPage * MOVIES_PER_PAGE
  
  const visibleMovies = movies.slice(startIndex, startIndex + MOVIES_PER_PAGE)

  const moviesToRender = isMobile ? movies : visibleMovies

  const canNavigate = totalPages > 1

  function handleNextPage() {
    if (!canNavigate) return

    setCurrentPage((page) => (page + 1) % totalPages)
  }

  function handlePreviousPage() {
    if (!canNavigate) return

    setCurrentPage((page) => (page - 1 + totalPages) % totalPages)
  }

  if (movies.length === 0) {
    return <p className="movie-carousel-empty">No movies found.</p>
  }

  return (
    <div className="movie-carousel">
      {!isMobile && (
        <button
          type="button"
          className="movie-carousel-button"
          onClick={handlePreviousPage}
          disabled={!canNavigate}
          aria-label="Previous movies"
        >
          ‹
        </button>
      )}

      <ul className="movie-carousel-grid">
        {moviesToRender.map((movie) => (
          <li key={movie.id} className="movie-card">
            <Link to={`/detailsMovie/${movie.id}`} className="movie-card-link">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-card-poster"
                />
              ) : (
                <div className="movie-card-poster movie-card-poster-placeholder">
                  No poster
                </div>
              )}

              <div className="movie-card-content">
                <h3>{movie.title}</h3>

                <div className="movie-card-info">
                  <span>{formatYear(movie.release_date)}</span>
                  <span>⭐ {formatRating(movie.vote_average)}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {!isMobile && (
        <button
          type="button"
          className="movie-carousel-button"
          onClick={handleNextPage}
          disabled={!canNavigate}
          aria-label="Next movies"
        >
          ›
        </button>
      )}
    </div>
  )
}