import { type ReactNode } from 'react'

import { FavoritesContext } from './FavoritesContext'

import { useLocalStorage } from '../../hooks/useLocalStorage'

import type { FavoriteType } from '../../types/FavoriteTypes'

type FavoritesProviderProps = {
  children: ReactNode
}

const FAVORITES_STORAGE_KEY = 'reviewbox:favorites'

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<FavoriteType[]>(FAVORITES_STORAGE_KEY, [])


  function addFavorite(movie: FavoriteType) {
    setFavorites((prev) => {
      const alreadyExists = prev.some((favorite) => favorite.id === movie.id)

      if (alreadyExists) {
        return prev
      }

      return [...prev, movie]
    })
  }

  function removeFavorite(movieId: number) {
    setFavorites((prev) =>
      prev.filter((favorite) => favorite.id !== movieId)
    )
  }

  function isFavorite(movieId: number) {
    return favorites.some((favorite) => favorite.id === movieId)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}