import type {
  Genre,
  Movie,
  MovieCrewMember,
  MovieDetails,
  TVSeries,
  TVSeriesDetails,
} from '../types/ApiTypes'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

type CatalogFilters = {
  genreId: number | null
  year: string | null
  rating: string | null
}

type MovieListResponse = {
  results: Movie[]
}

type TVSeriesListResponse = {
  results: TVSeries[]
}

type GenreListResponse = {
  genres: Genre[]
}

type MovieCreditsResponse = {
  crew: MovieCrewMember[]
}

function getApiKey() {
  if (!API_KEY) {
    throw new Error('Missing TMDB API key.')
  }

  return API_KEY
}

async function fetchTMDB<T>( endpoint: string, params: Record<string, string> = {}, errorMessage: string ): Promise<T> {

  const searchParams = new URLSearchParams({ api_key: getApiKey(), ...params})

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json()
}

// Movies

export async function getPopularMovies() {
  const data = await fetchTMDB<MovieListResponse>( '/movie/popular', {}, 'Failed to load popular movies.' )
  return data.results
}

export async function getTopRatedMovies() {
  const data = await fetchTMDB<MovieListResponse>( '/movie/top_rated', {}, 'Failed to load top rated movies.' )
  return data.results
}

export async function getCatalogMovies({ genreId, year, rating }: CatalogFilters) {
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

  const data = await fetchTMDB<MovieListResponse>( '/discover/movie', params, 'Failed to load catalog movies.' )
  return data.results
}

export async function searchMovies(searchQuery: string) {
  const data = await fetchTMDB<MovieListResponse>( '/search/movie', { query: searchQuery }, 'Failed to search movies.' )
  return data.results
}

export async function getMovieGenres() {
  const data = await fetchTMDB<GenreListResponse>( '/genre/movie/list', {}, 'Failed to load movie genres.' )
  return data.genres
}

export async function getMovieDetails(movieId: number) {
  return fetchTMDB<MovieDetails>( `/movie/${movieId}`, {}, 'Failed to load movie details.' )
}

export async function getMovieCredits(movieId: number) {
  const data = await fetchTMDB<MovieCreditsResponse>( `/movie/${movieId}/credits`, {}, 'Failed to load movie credits.' )
  return data.crew
}

// Series

export async function getPopularSeries() {
  const data = await fetchTMDB<TVSeriesListResponse>( '/tv/popular', {}, 'Failed to load popular series.')
  return data.results
}

export async function getTopRatedSeries() {
  const data = await fetchTMDB<TVSeriesListResponse>( '/tv/top_rated', {}, 'Failed to load top rated series.')
  return data.results
}

export async function getCatalogSeries({ genreId, year, rating }: CatalogFilters) {
  const params: Record<string, string> = {}

  if (genreId !== null) {
    params.with_genres = String(genreId)
  }

  if (year !== null) {
    params.first_air_date_year = year
  }

  if (rating !== null) {
    params['vote_average.gte'] = rating
  }

  const data = await fetchTMDB<TVSeriesListResponse>( '/discover/tv', params, 'Failed to load catalog series.' )
  return data.results
}

export async function searchSeries(searchQuery: string) {
  const data = await fetchTMDB<TVSeriesListResponse>( '/search/tv', { query: searchQuery }, 'Failed to search series.' )
  return data.results
}

export async function getSeriesGenres() {
  const data = await fetchTMDB<GenreListResponse>( '/genre/tv/list', {}, 'Failed to load series genres.' )
  return data.genres
}

export async function getSeriesDetails(seriesId: number) {
  return fetchTMDB<TVSeriesDetails>( `/tv/${seriesId}`, {}, 'Failed to load series details.' )
}