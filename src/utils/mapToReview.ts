import type { MovieDetails } from '../types/ApiTypes'
import type { ReviewType } from '../types/ReviewType'

export function mapToReview(
  movie: MovieDetails,
  userReview: string,
  userRating: ReviewType['userRating']
): ReviewType {
  return {
    id: Date.now(),
    movieId: movie.id,
    title: movie.title,
    userReview,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    createdAt: new Date().toISOString(),
    userRating,
    reviewType: 'movies'
  }
}