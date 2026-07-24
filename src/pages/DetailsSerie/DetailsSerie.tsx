import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { MediaDetailsCard } from '../../components/MediaDetailsCard/MediaDetailsCard'
import { ReviewForm } from '../Reviews/components/ReviewForm/ReviewForm'
import { DetailsReviewList } from '../Reviews/components/DetailsReviewList/DetailsReviewList'

import { useFavorites } from '../../hooks/useFavorites'
import { useReviews } from '../../hooks/useReviews'

import { getSeriesDetails } from '../../services/tmdbApi'
import { mapSeriesToFavorite, mapSeriesToMediaDetails } from '../../utils/mapSeries'

import type { TVSeriesDetails } from '../../types/ApiTypes'
import type { AddDetailsReviewsForm } from '../../types/ReviewType'

import './DetailsSeries.css'

export function DetailsSeries() {
  const { serieId } = useParams()
  const serieIdNumber = Number(serieId)

  const { reviews } = useReviews()
  const { addFavorite, favorites } = useFavorites()

  const [seriesDetails, setSeriesDetails] = useState<TVSeriesDetails | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadSeriesDetails() {
      if (!serieIdNumber) {
        setErrorMessage('Invalid series ID.')
        return
      }

      try {
        setIsLoading(true)
        setErrorMessage('')

        const details = await getSeriesDetails(serieIdNumber)
        setSeriesDetails(details)
      } catch {
        setErrorMessage('Failed to load series details.')
      } finally {
        setIsLoading(false)
      }
    }

    loadSeriesDetails()
  }, [serieIdNumber])

  function handleAddFavorite() {
    if (!seriesDetails) return

    addFavorite(mapSeriesToFavorite(seriesDetails))
  }

  if (isLoading) {
    return (
      <main className="details-page">
        <p className="details-status-message">Loading series details...</p>
      </main>
    )
  }

  if (errorMessage) {
    return (
      <main className="details-page">
        <p className="details-status-message details-status-message-error">
          {errorMessage}
        </p>
      </main>
    )
  }

  if (!seriesDetails) {
    return null
  }

  const creators = seriesDetails.created_by
    .map((creator) => creator.name)
    .join(', ')

  const seriesIsFavorite = favorites.some(
    (favorite) =>
      favorite.id === seriesDetails.id && favorite.mediaType === 'Serie'
  )

  const seriesReviews = reviews.filter(
    (review) =>
      review.mediaId === seriesDetails.id && review.reviewType === 'series'
  )

  const reviewDetailsSerie: AddDetailsReviewsForm = {
    mediaId: seriesDetails.id,
    title: seriesDetails.name,
    posterPath: seriesDetails.poster_path,
    releaseDate: seriesDetails.first_air_date,
    reviewType: 'series'
  }

  return (
    <main className="details-page">
      <MediaDetailsCard mediaDetails={mapSeriesToMediaDetails(seriesDetails,creators)}  />

      <section className="details-actions">
        <button
          type="button"
          className="favorite-button"
          onClick={handleAddFavorite}
        >
          {seriesIsFavorite ? 'Added to Favorites' : 'Add to favorites'}
        </button>
      </section>

      <section className="details-review-form-section">
        <div className="details-section-header">
          <p className="section-label">Your review</p>
          <h2>Rate this series</h2>
        </div>

        <ReviewForm media={reviewDetailsSerie} />
      </section>

      <section className="details-reviews-section">
        <div className="details-section-header">
          <p className="section-label">Community</p>
          <h2>Reviews</h2>
        </div>

        {seriesReviews.length === 0 ? (
          <p className="details-empty-message">
            No reviews for this series yet.{' '}
            <Link to="/catalog" className="details-empty-link">
              Explore catalog
            </Link>
          </p>
        ) : (
          <DetailsReviewList reviews={seriesReviews} />
        )}
      </section>
    </main>
  )
}