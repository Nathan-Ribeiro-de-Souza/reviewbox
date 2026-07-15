import { useState } from 'react'
import { Link } from 'react-router-dom'

import { StarRating } from '../../components/RatingStars/StarRating'
import { useReviews } from '../../hooks/useReviews'
import { formatYear, formatReviewDate } from '../../utils/formatters'

import './ReviewsPage.css'

type RatingFilter = 'All' | '5' | '4' | '3' | '2' | '1'
type TypeFilter = 'All' | 'movies' | 'series' | 'animes'

const ratingFilterOptions: RatingFilter[] = ['5', '4', '3', '2', '1']

const typeFilterOptions: { label: string; value: TypeFilter }[] = [
  { label: 'Movies', value: 'movies' },
  { label: 'Series coming soon', value: 'series' },
  { label: 'Animes coming soon', value: 'animes' }
]

export function ReviewsPage() {
  const { reviews } = useReviews()

  const [selectedRating, setSelectedRating] = useState<RatingFilter>('All')
  const [selectedType, setSelectedType] = useState<TypeFilter>('All')

  const filteredReviews = reviews.filter((review) => {
    const matchesRating =
      selectedRating === 'All'
        ? true
        : review.userRating === Number(selectedRating)

    const matchesType =
      selectedType === 'All'
        ? true
        : review.reviewType === selectedType

    return matchesRating && matchesType
  })

  const hasReviews = filteredReviews.length > 0

  return (
    <main className="reviews-page">

      <section className="reviews-hero">
        <p className="section-label">Reviews</p>
        <h1>Your movie reviews.</h1>
        <p>Browse, filter and revisit everything you have reviewed.</p>
      </section>

      <section className="reviews-controls">
        <select
          value={selectedRating}
          onChange={(event) =>
            setSelectedRating(event.target.value as RatingFilter)
          }
        >
          <option value="All">All ratings</option>

          {ratingFilterOptions.map((rating) => (
            <option key={rating} value={rating}>
              {rating} stars
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(event) =>
            setSelectedType(event.target.value as TypeFilter)
          }
        >
          <option value="All">All types</option>

          {typeFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      <section className="reviews-content">
        {!hasReviews && (
          <p className="reviews-empty-message">
            No reviews found with the selected filters.
          </p>
        )}

        {hasReviews && (
          <ul className="reviews-grid">
            {filteredReviews.map((review) => (
              <li key={review.id} className="review-card">
                <Link
                  to={`/detailsMovie/${review.movieId}`}
                  className="review-card-poster-link"
                >
                  {review.posterPath ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${review.posterPath}`}
                      alt={review.title}
                      className="review-card-poster"
                    />
                  ) : (
                    <div className="review-card-poster review-card-poster-placeholder">
                      No poster
                    </div>
                  )}
                </Link>

                <div className="review-card-content">
                  <div>
                    <p className="review-card-type">{review.reviewType}</p>
                    <h2>{review.title}</h2>
                  </div>

                  <p className="review-card-text">{review.userReview}</p>

                  <div className="review-card-meta">
                    <span>{formatYear(review.releaseDate)}</span>
                    <span>Reviewed on {formatReviewDate(review.createdAt)}</span> 
                  </div>

                  <StarRating value={review.userRating} readOnly />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}