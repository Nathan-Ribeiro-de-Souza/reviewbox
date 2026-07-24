import type { MovieDetails } from '../types/ApiTypes'
import type { FavoriteType } from '../types/FavoriteTypes'
import type { MediaDetailsType } from '../types/MediaDetailsType'

export function mapToFavorite(movie: MovieDetails): FavoriteType {
  return {
    id: movie.id,
    mediaType: 'Movie',
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average
  }
}

export function mapToDetailsMovie(MovieDetail: MovieDetails, director: string): MediaDetailsType{
  return{
      title: MovieDetail.title,
      overview: MovieDetail.overview,
      voteCount: MovieDetail.vote_count,
      posterPath: MovieDetail.poster_path,
      voteAverage: MovieDetail.vote_average,
      releaseDate: MovieDetail.release_date,
      genres: MovieDetail.genres,
      metaItems: [
        {label: 'Runtime', value: MovieDetail.runtime},
        {label: 'Director', value: director}
      ]
  }
}