import {
  deleteReview,
  editReview,
  getReviews,
  postReviews
} from '../repositories/reviews.repository.js'

import {
  NotFoundError,
  ValidationError
} from '../errors/errors.js'

export async function serviceGetReviews(userId) {
  const reviews = await getReviews(userId)

  const reviewsWithMovieData = await Promise.all(
    reviews.map(async (review) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${review.mediaId}?api_key=${process.env.TMDB_API_KEY}`
      )

      if (!response.ok) {
        throw new Error('Failed to load movie from TMDB')
      }

      const data = await response.json()

      return {
        id: review.id,
        mediaId: review.mediaId,
        userRating: review.userRating,
        userReview: review.userReview,
        createdAt: review.createdAt,
        reviewType: review.reviewType,
        title: data.title,
        posterPath: data.poster_path,
        releaseDate: data.release_date
      }
    })
  )

  return reviewsWithMovieData
}

export async function servicePostReviews(
  userId,
  mediaId,
  rating,
  comment,
  mediaType
) {
  if (!Number.isInteger(mediaId) || mediaId <= 0) {
    throw new ValidationError('Invalid media id')
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
    throw new ValidationError('Rating must be between 1 and 10')
  }

  if (typeof comment !== 'string' || comment.trim() === '') {
    throw new ValidationError('Invalid comment')
  }

  if (mediaType !== 'movies' && mediaType !== 'series') {
    throw new ValidationError('Invalid media type')
  }

  return postReviews(
    userId,
    mediaId,
    rating,
    comment.trim(),
    mediaType
  )
}

export async function serviceDeleteReviews(
  reviewId,
  userId
) {
  if (!Number.isInteger(reviewId) || reviewId <= 0) {
    throw new ValidationError('Invalid review id')
  }

  const review = await deleteReview(reviewId, userId)

  if (!review) {
    throw new NotFoundError('Review not found')
  }

  return review
}

export async function serviceEditReview(
  reviewId,
  userId,
  comment,
  rating
) {
  if (typeof comment !== 'string' || comment.trim() === '') {
    throw new ValidationError('Invalid comment')
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
    throw new ValidationError('Invalid rating')
  }

  if (!Number.isInteger(reviewId) || reviewId <= 0) {
    throw new ValidationError('Invalid review id')
  }

  const review = await editReview(
    reviewId,
    userId,
    comment.trim(),
    rating
  )

  if (!review) {
    throw new NotFoundError('Review not found')
  }

  return review
}