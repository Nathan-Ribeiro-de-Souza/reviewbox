import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { formatRating, formatYear } from '../../../../utils/formatters'
import type { TVSeries } from '../../../../types/ApiTypes'

import './SerieCarousel.css'

type SerieCarouselProps = {
  series: TVSeries[]
}

const SERIES_PER_PAGE = 5
const MOBILE_QUERY = '(max-width: 620px)'

export function SerieCarousel({ series }: SerieCarouselProps) {
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

  const totalPages = Math.ceil(series.length / SERIES_PER_PAGE)
  const startIndex = currentPage * SERIES_PER_PAGE
  const visibleSeries = series.slice(startIndex, startIndex + SERIES_PER_PAGE)
  const seriesToRender = isMobile ? series : visibleSeries
  const canNavigate = totalPages > 1

  function handleNextPage() {
    if (!canNavigate) return

    setCurrentPage((page) => (page + 1) % totalPages)
  }

  function handlePreviousPage() {
    if (!canNavigate) return

    setCurrentPage((page) => (page - 1 + totalPages) % totalPages)
  }

  if (series.length === 0) {
    return <p className="serie-carousel-empty">No series found.</p>
  }

  return (
    <div className="serie-carousel">
      {!isMobile && (
        <button
          type="button"
          className="serie-carousel-button"
          onClick={handlePreviousPage}
          disabled={!canNavigate}
          aria-label="Previous series"
        >
          ‹
        </button>
      )}

      <ul className="serie-carousel-grid">
        {seriesToRender.map((serie) => (
          <li key={serie.id} className="serie-card">
            <Link to={`/detailsSerie/${serie.id}`} className="serie-card-link">
              {serie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
                  alt={serie.name}
                  className="serie-card-poster"
                />
              ) : (
                <div className="serie-card-poster serie-card-poster-placeholder">
                  No poster
                </div>
              )}

              <div className="serie-card-content">
                <h3>{serie.name}</h3>

                <div className="serie-card-info">
                  <span>{formatYear(serie.first_air_date)}</span>
                  <span>⭐ {formatRating(serie.vote_average)}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {!isMobile && (
        <button
          type="button"
          className="serie-carousel-button"
          onClick={handleNextPage}
          disabled={!canNavigate}
          aria-label="Next series"
        >
          ›
        </button>
      )}
    </div>
  )
}