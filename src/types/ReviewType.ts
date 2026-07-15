export type ReviewType = {
  id: number
  movieId: number
  title: string
  userReview: string
  posterPath: string | null
  releaseDate: string
  createdAt: string
  userRating: number
  reviewType: 'movies' | 'series' | 'animes'
}