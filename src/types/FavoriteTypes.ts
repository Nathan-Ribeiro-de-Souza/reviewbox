export type MediaType = 'Movie' | 'Serie'

export type FavoriteType = {
  id: number
  mediaType: MediaType
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
}