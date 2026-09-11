import { useEffect, useState } from 'react'

import { MovieCarousel } from './components/MovieCarousel/MovieCarousel'
import { SerieCarousel } from './components/SerieCarousel/SerieCarousel'

import {
  getPopularMovies,
  getTopRatedMovies,
  getPopularSeries,
  getTopRatedSeries
} from '../../services/tmdbApi'

import type { Movie, TVSeries } from '../../types/ApiTypes'

import './Home.css'

export function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])

  const [popularSeries, setPopularSeries] = useState<TVSeries[]>([])
  const [topRatedSeries, setTopRatedSeries] = useState<TVSeries[]>([])

  const [isPopularMoviesLoading, setIsPopularMoviesLoading] = useState(false)
  const [isTopRatedMoviesLoading, setIsTopRatedMoviesLoading] = useState(false)

  const [isPopularSeriesLoading, setIsPopularSeriesLoading] = useState(false)
  const [isTopRatedSeriesLoading, setIsTopRatedSeriesLoading] = useState(false)

  const [popularMoviesErrorMessage, setPopularMoviesErrorMessage] = useState('')
  const [topRatedMoviesErrorMessage, setTopRatedMoviesErrorMessage] = useState('')

  const [popularSeriesErrorMessage, setPopularSeriesErrorMessage] = useState('')
  const [topRatedSeriesErrorMessage, setTopRatedSeriesErrorMessage] = useState('')

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        setIsPopularMoviesLoading(true)
        setPopularMoviesErrorMessage('')

        const movies = await getPopularMovies()
        setPopularMovies(movies)
      } catch {
        setPopularMoviesErrorMessage('Failed to load popular movies.')
      } finally {
        setIsPopularMoviesLoading(false)
      }
    }

    async function loadTopRatedMovies() {
      try {
        setIsTopRatedMoviesLoading(true)
        setTopRatedMoviesErrorMessage('')

        const movies = await getTopRatedMovies()
        setTopRatedMovies(movies)
      } catch {
        setTopRatedMoviesErrorMessage('Failed to load top rated movies.')
      } finally {
        setIsTopRatedMoviesLoading(false)
      }
    }

    async function loadPopularSeries() {
      try {
        setIsPopularSeriesLoading(true)
        setPopularSeriesErrorMessage('')

        const series = await getPopularSeries()
        setPopularSeries(series)
      } catch {
        setPopularSeriesErrorMessage('Failed to load popular series.')
      } finally {
        setIsPopularSeriesLoading(false)
      }
    }

    async function loadTopRatedSeries() {
      try {
        setIsTopRatedSeriesLoading(true)
        setTopRatedSeriesErrorMessage('')

        const series = await getTopRatedSeries()
        setTopRatedSeries(series)
      } catch {
        setTopRatedSeriesErrorMessage('Failed to load top rated series.')
      } finally {
        setIsTopRatedSeriesLoading(false)
      }
    }

    loadPopularMovies()
    loadTopRatedMovies()
    loadPopularSeries()
    loadTopRatedSeries()
  }, [])

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="section-label">ReviewBox</p>
        <h1>Discover, rate and review your favorite stories.</h1>
        <p>
          Explore popular and top rated movies and series while building your
          own review collection.
        </p>
      </section>

      <section className="home-section">
        <div className="section-header">
          <p className="section-label">Trending now</p>
          <h2>Popular Movies</h2>
        </div>

        {isPopularMoviesLoading && <p className="status-message">Loading...</p>}

        {popularMoviesErrorMessage && (
          <p className="status-message status-message-error">
            {popularMoviesErrorMessage}
          </p>
        )}

        {!isPopularMoviesLoading && !popularMoviesErrorMessage && (
          <MovieCarousel movies={popularMovies} />
        )}
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Popular Series</h2>
        </div>

        {isPopularSeriesLoading && <p className="status-message">Loading...</p>}

        {popularSeriesErrorMessage && (
          <p className="status-message status-message-error">
            {popularSeriesErrorMessage}
          </p>
        )}

        {!isPopularSeriesLoading && !popularSeriesErrorMessage && (
          <SerieCarousel series={popularSeries} />
        )}
      </section>

      <section className="home-section">
        <div className="section-header">
          <p className="section-label">Best rated</p>
          <h2>Top Rated Movies</h2>
        </div>

        {isTopRatedMoviesLoading && <p className="status-message">Loading...</p>}

        {topRatedMoviesErrorMessage && (
          <p className="status-message status-message-error">
            {topRatedMoviesErrorMessage}
          </p>
        )}

        {!isTopRatedMoviesLoading && !topRatedMoviesErrorMessage && (
          <MovieCarousel movies={topRatedMovies} />
        )}
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Top Rated Series</h2>
        </div>

        {isTopRatedSeriesLoading && <p className="status-message">Loading...</p>}

        {topRatedSeriesErrorMessage && (
          <p className="status-message status-message-error">
            {topRatedSeriesErrorMessage}
          </p>
        )}

        {!isTopRatedSeriesLoading && !topRatedSeriesErrorMessage && (
          <SerieCarousel series={topRatedSeries} />
        )}
      </section>
    </main>
  )
}