import type { Genre, Movie, MovieDetails } from '../types/ApiTypes'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

type CatalogMovieFilters = {
  genreId: number | null
  year: string | null
  rating: string | null
}

type MovieListResponse = {
  results: Movie[]
}

type GenreListResponse = {
  genres: Genre[]
}

type CrewMember = {
  id: number
  name: string
  job: string
}

type MovieCreditsResponse = {
  crew: CrewMember[]
}

function getApiKey() {
  if (!API_KEY) {
    throw new Error('Missing TMDB API key.')
  }

  return API_KEY
}

async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {},
  errorMessage: string
): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: getApiKey(),
    ...params
  })

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json()
}

export async function getPopularMovies() {
  const data = await fetchTMDB<MovieListResponse>(
    '/movie/popular',
    {},
    'Failed to load popular movies.'
  )

  return data.results
}

export async function getTopRatedMovies() {
  const data = await fetchTMDB<MovieListResponse>(
    '/movie/top_rated',
    {},
    'Failed to load top rated movies.'
  )

  return data.results
}

export async function getCatalogMovies({
  genreId,
  year,
  rating
}: CatalogMovieFilters) {
  const params: Record<string, string> = {}

  if (genreId !== null) {
    params.with_genres = String(genreId)
  }

  if (year !== null) {
    params.primary_release_year = year
  }

  if (rating !== null) {
    params['vote_average.gte'] = rating
  }

  const data = await fetchTMDB<MovieListResponse>(
    '/discover/movie',
    params,
    'Failed to load catalog movies.'
  )

  return data.results
}

export async function searchMovies(searchQuery: string) {
  const data = await fetchTMDB<MovieListResponse>(
    '/search/movie',
    {
      query: searchQuery
    },
    'Failed to search movies.'
  )

  return data.results
}

export async function getMovieGenres() {
  const data = await fetchTMDB<GenreListResponse>(
    '/genre/movie/list',
    {},
    'Failed to load movie genres.'
  )

  return data.genres
}

export async function getMovieDetails(movieId: number) {
  return fetchTMDB<MovieDetails>(
    `/movie/${movieId}`,
    {},
    'Failed to load movie details.'
  )
}

export async function getMovieCredits(movieId: number) {
  const data = await fetchTMDB<MovieCreditsResponse>(
    `/movie/${movieId}/credits`,
    {},
    'Failed to load movie credits.'
  )

  return data.crew
}