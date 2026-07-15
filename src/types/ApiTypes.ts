export type Movie = {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  genre_ids: number[]
}

export type Genre = {
  id: number
  name: string
}

export type MovieDetails = {
  id: number
  title: string
  overview: string
  vote_count: number
  poster_path: string | null
  vote_average: number
  release_date: string
  genres: Genre[]
  runtime: number
}

export type CrewMember = {
  id: number
  name: string
  job: string
}