import type { Genre } from "./ApiTypes"

export type MediaDetailsType = {
  title: string
  overview: string
  voteCount: number
  posterPath: string | null
  voteAverage: number
  releaseDate: string
  genres: Genre[]
  metaItems: MetaItem[]
}

type MetaItem = {
  label: string
  value: string | number | null | undefined
}