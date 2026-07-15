import type { Movie, MovieDetails } from '../types/ApiTypes'
import type { FavoriteType } from '../types/FavoriteTypes'

export function mapToFavorite(movie: Movie | MovieDetails): FavoriteType {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average
  }
}