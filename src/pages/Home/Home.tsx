import { useEffect, useState } from 'react'

import { MovieCarousel } from './components/MovieCarousel/MovieCarousel'
import { getPopularMovies, getTopRatedMovies } from '../../services/tmdbApi'

import type { Movie } from '../../types/ApiTypes'

import './Home.css'

export function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])

  const [isPopularLoading, setIsPopularLoading] = useState(false)
  const [isTopRatedLoading, setIsTopRatedLoading] = useState(false)

  const [popularErrorMessage, setPopularErrorMessage] = useState('')
  const [topRatedErrorMessage, setTopRatedErrorMessage] = useState('')

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        setIsPopularLoading(true)
        setPopularErrorMessage('')

        const movies = await getPopularMovies()
        setPopularMovies(movies)
      } catch {
        setPopularErrorMessage('Failed to load popular movies.')
      } finally {
        setIsPopularLoading(false)
      }
    }

    async function loadTopRatedMovies() {
      try {
        setIsTopRatedLoading(true)
        setTopRatedErrorMessage('')

        const movies = await getTopRatedMovies()
        setTopRatedMovies(movies)
      } catch {
        setTopRatedErrorMessage('Failed to load top rated movies.')
      } finally {
        setIsTopRatedLoading(false)
      }
    }

    loadPopularMovies()
    loadTopRatedMovies()
  }, [])

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="section-label">ReviewBox</p>

        <h1>Discover, rate and review your favorite stories.</h1>

        <p>
          Explore popular and top rated movies while building your own review
          collection.
        </p>
      </section>

      <section className="home-section">
        <div className="section-header">
          <p className="section-label">Trending now</p>
          <h2>Popular Movies</h2>
        </div>

        {isPopularLoading && <p className="status-message">Loading...</p>}

        {popularErrorMessage && (
          <p className="status-message status-message-error">
            {popularErrorMessage}
          </p>
        )}

        {!isPopularLoading && !popularErrorMessage && (
          <MovieCarousel movies={popularMovies} />
        )}
      </section>

      <section className="home-section">
        <div className="section-header">
          <p className="section-label">Best rated</p>
          <h2>Top Rated Movies</h2>
        </div>

        {isTopRatedLoading && <p className="status-message">Loading...</p>}

        {topRatedErrorMessage && (
          <p className="status-message status-message-error">
            {topRatedErrorMessage}
          </p>
        )}

        {!isTopRatedLoading && !topRatedErrorMessage && (
          <MovieCarousel movies={topRatedMovies} />
        )}
      </section>
    </main>
  )
}