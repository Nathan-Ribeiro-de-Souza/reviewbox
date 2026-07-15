import { Link } from 'react-router-dom'

import { useFavorites } from '../../hooks/useFavorites'
import { formatRating, formatYear } from '../../utils/formatters'

import './FavoritesPage.css'

export function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()

  const hasFavorites = favorites.length > 0

  return (
    <main className="favorites-page">
      <section className="favorites-hero">
        <p className="section-label">Favorites</p>
        <h1>Your saved movies.</h1>
        <p>Keep track of the movies you want to revisit later.</p>
      </section>

      <section className="favorites-content">
        {!hasFavorites && (
          <p className="favorites-empty-message">
            You have not added any favorite movies yet.
          </p>
        )}

        {hasFavorites && (
          <ul className="favorites-grid">
            {favorites.map((favorite) => (
              <li key={favorite.id} className="favorite-card">
                <Link
                  to={`/detailsMovie/${favorite.id}`}
                  className="favorite-card-link"
                >
                  
                  {favorite.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${favorite.poster_path}`}
                      alt={favorite.title}
                      className="favorite-card-poster"
                    />
                  ) : (
                    <div className="favorite-card-poster favorite-card-poster-placeholder">
                      No poster
                    </div>
                  )}

                  <div className="favorite-card-content">
                    <h2>{favorite.title}</h2>

                    <div className="favorite-card-info">
                      <span>{formatYear(favorite.release_date)}</span>
                      <span>⭐ {formatRating(favorite.vote_average)}</span>
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  className="favorite-card-remove-button"
                  onClick={() => removeFavorite(favorite.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}