export type Genre = {
  id: number
  name: string
}

// Movies

export type Movie = {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  genre_ids: number[]
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

export type MovieCrewMember = {
  id: number
  name: string
  job: string
}

// Series

export type TVSeries = {
  id: number
  name: string
  poster_path: string | null
  first_air_date: string
  vote_average: number
  genre_ids: number[]
}

export type TVSeriesDetails = {
  id: number
  name: string
  overview: string
  poster_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  number_of_episodes: number
  number_of_seasons: number
  genres: Genre[]
  created_by: SeriesCreator[]
  status: string
}

type SeriesCreator = {
  id: number
  name: string
}