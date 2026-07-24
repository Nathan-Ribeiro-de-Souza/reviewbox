import { Link } from 'react-router-dom'

import { formatRating, formatYear } from '../../../../utils/formatters'

import type { TVSeries } from '../../../../types/ApiTypes'

import './CatalogSerieGrid.css'

type CatalogSerieGridProps = {
  series: TVSeries[]
  getGenreNameByIds: (genreIds: number[]) => string
}

export function CatalogSerieGrid({ series, getGenreNameByIds }: CatalogSerieGridProps) {
  return (
    <ul className="catalog-serie-grid">
      {series.map((serie) => (
        <li key={serie.id} className="catalog-serie-card">
          <Link to={`/detailsSerie/${serie.id}`} className="catalog-serie-card-link">
            {serie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
                alt={serie.name}
                className="catalog-serie-card-poster"
              />
            ) : (
              <div className="catalog-serie-card-poster catalog-serie-card-poster-placeholder">
                No poster
              </div>
            )}

            <div className="catalog-serie-card-content">
              <h2>{serie.name}</h2>

              <div className="catalog-serie-card-info">
                <span>{formatYear(serie.first_air_date)}</span>
                <span>⭐ {formatRating(serie.vote_average)}</span>
              </div>

              <p>{getGenreNameByIds(serie.genre_ids)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}