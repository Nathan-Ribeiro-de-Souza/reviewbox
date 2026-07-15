import { Link } from 'react-router-dom'

import { formatRating, formatYear } from '../../../../utils/formatters'

import type { Movie } from '../../../../types/ApiTypes'

import './CatalogMovieGrid.css'

type CatalogMovieGridProps = {
  movies: Movie[]
  getGenreNamesByIds: (genreIds: number[]) => string
}

export function CatalogMovieGrid({ movies, getGenreNamesByIds }: CatalogMovieGridProps) {

  return (
    <ul className="catalog-grid">
      {movies.map((movie) => (
        <li key={movie.id} className="catalog-card">
          <Link to={`/detailsMovie/${movie.id}`} className="catalog-card-link">
            
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="catalog-card-poster"
              />
            ) : (
              <div className="catalog-card-poster catalog-card-poster-placeholder">
                No poster
              </div>
            )}

            <div className="catalog-card-content">
              <h2>{movie.title}</h2>

              <div className="catalog-card-info">
                <span>{formatYear(movie.release_date)}</span>
                <span>⭐ {formatRating(movie.vote_average)}</span>
              </div>

              <p>{getGenreNamesByIds(movie.genre_ids)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}