import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useFavorites } from '../../hooks/useFavorites'
import { useReviews } from '../../hooks/useReviews'

import { getMovieCredits, getMovieDetails } from '../../services/tmdbApi'

import type { MovieDetails } from '../../types/ApiTypes'
import type { AddDetailsReviewsForm } from '../../types/ReviewType'

import { mapToDetailsMovie, mapToFavorite } from '../../utils/mapMovies'

import { ReviewForm } from '../Reviews/components/ReviewForm/ReviewForm'
import { DetailsReviewList } from '../Reviews/components/DetailsReviewList/DetailsReviewList'
import { MediaDetailsCard } from '../../components/MediaDetailsCard/MediaDetailsCard'

import './DetailsMovie.css'

export function DetailsMovie() {
  const { movieId } = useParams()
  const movieIdNumber = Number(movieId)

  const { reviews } = useReviews()
  const { addFavorite, favorites } = useFavorites()

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [directorName, setDirectorName] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadMovieData() {
      if (!movieIdNumber) {
        setErrorMessage('Invalid movie ID.')
        return
      }

      try {
        setIsLoading(true)
        setErrorMessage('')

        const [details, crew] = await Promise.all([
          getMovieDetails(movieIdNumber),
          getMovieCredits(movieIdNumber)
        ])

        const director = crew.find((person) => person.job === 'Director')

        setMovieDetails(details)
        setDirectorName(director?.name ?? '')
      } catch {
        setErrorMessage('Failed to load movie details.')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovieData()
  }, [movieIdNumber])

  function handleAddFavorite() {
    if (!movieDetails) return

    addFavorite(mapToFavorite(movieDetails))
  }

  if (isLoading) {
    return (
      <main className="details-page">
        <p className="details-status-message">Loading movie details...</p>
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

  if (!movieDetails) {
    return null
  }

  const movieIsFavorite = favorites.some(
    (favorite) =>
      favorite.id === movieDetails.id && favorite.mediaType === 'Movie'
  )

  const movieReviews = reviews.filter(
    (review) =>
      review.mediaId === movieDetails.id && review.reviewType === 'movies'
  )

  const reviewDetailsMovie: AddDetailsReviewsForm = {
    mediaId: movieDetails.id,
    title: movieDetails.title,
    posterPath: movieDetails.poster_path,
    releaseDate: movieDetails.release_date,
    reviewType: 'movies'
  }

  return (
    <main className="details-page">
      <MediaDetailsCard
      mediaDetails={mapToDetailsMovie(movieDetails, directorName)}
      />

      <section className="details-actions">
        <button
          type="button"
          className="favorite-button"
          onClick={handleAddFavorite}
        >
          {movieIsFavorite ? 'Added to Favorites' : 'Add to favorites'}
        </button>
      </section>

      <section className="details-review-form-section">
        <div className="details-section-header">
          <p className="section-label">Your review</p>
          <h2>Rate this movie</h2>
        </div>

        <ReviewForm media={reviewDetailsMovie} />
      </section>

      <section className="details-reviews-section">
        <div className="details-section-header">
          <p className="section-label">Community</p>
          <h2>Reviews</h2>
        </div>

        {movieReviews.length === 0 ? (
          <p className="details-empty-message">
            No reviews for this movie yet.{' '}
            <Link to="/catalog" className="details-empty-link">
              Explore catalog
            </Link>
          </p>
        ) : (
          <DetailsReviewList reviews={movieReviews} />
        )}
      </section>
    </main>
  )
}