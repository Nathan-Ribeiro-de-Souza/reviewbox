import type { MovieDetails } from '../../../../types/ApiTypes'
import { formatRating, formatVoteCount, formatYear } from '../../../../utils/formatters'

import './DetailsCard.css'

type DetailsCardProps = {
  movie: MovieDetails
  directorName: string
}

export function DetailsCard({ movie, directorName }: DetailsCardProps) {
  return (
    <section className="details-card">
      <div className="details-card-poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="details-card-poster"
          />
        ) : (
          <div className="details-card-poster details-card-poster-placeholder">
            No poster
          </div>
        )}
      </div>

      <div className="details-card-content">

        <h1>{movie.title}</h1>

        <p className="details-card-overview">
          {movie.overview || 'No overview available.'}
        </p>

        <div className="details-card-info">
          <span>{formatYear(movie.release_date)}</span>
          <span>{movie.runtime} min</span>
          <span>⭐ {formatRating(movie.vote_average)}</span>
          <span>👍 {formatVoteCount(movie.vote_count)} votes</span>
        </div>

        <div className="details-card-meta">
          <span>
            Director:{' '}
            <strong>{directorName || 'Unknown director'}</strong>
          </span>
        </div>

        <div className="details-card-genres">
          {movie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}