import type { Movie } from './ApiTypes'

export type FavoriteType = Pick<
  Movie,
  'id' | 'title' | 'poster_path' | 'release_date' | 'vote_average'
>