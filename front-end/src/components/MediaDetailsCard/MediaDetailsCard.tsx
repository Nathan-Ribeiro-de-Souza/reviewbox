import { formatRating, formatVoteCount, formatYear } from '../../utils/formatters'

import './MediaDetailsCard.css'
import type { MediaDetailsType } from '../../types/MediaDetailsType'

type MediaDetailsCardProps = {
  mediaDetails: MediaDetailsType
}

export function MediaDetailsCard({ mediaDetails }: MediaDetailsCardProps) {
  const posterUrl = mediaDetails.posterPath ? `https://image.tmdb.org/t/p/w500${mediaDetails.posterPath}` : null

  return (
    <section className="media-details-card">
      <div className="media-details-poster-wrapper">
        {posterUrl ? (
          <img className="media-details-poster" src={posterUrl} alt={mediaDetails.title} />
        ) : (
          <div className="media-details-poster-placeholder">
            No poster available
          </div>
        )}
      </div>

      <div className="media-details-content">
        <p className="section-label">Details</p>

        <h1>{mediaDetails.title}</h1>

        <div className="media-details-meta">
          <span>{formatYear(mediaDetails.releaseDate)}</span>
          <span>⭐ {formatRating(mediaDetails.voteAverage)}</span>
          <span>{formatVoteCount(mediaDetails.voteCount)} votes</span>
        </div>

        {mediaDetails.genres.length > 0 && (
          <p className="media-details-genres">
            {mediaDetails.genres.map((genre) => genre.name).join(', ')}
          </p>
        )}

        <p className="media-details-overview">
          {mediaDetails.overview || 'No overview available.'}
        </p>

        {mediaDetails.metaItems.length > 0 && (
          <div className="media-details-extra">
            {mediaDetails.metaItems.map((item) => {
              if (item.value === null || item.value === undefined || item.value === '') {
                return null
              }

              return (
                <p key={item.label}>
                  <strong>{item.label}:</strong> {item.value}
                </p>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}