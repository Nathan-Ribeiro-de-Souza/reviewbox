export type MediaType = 'movies' | 'series'

export type FavoriteType = {
  id: number
  mediaId: number
  mediaType: MediaType
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
}