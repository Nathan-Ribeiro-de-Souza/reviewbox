import { type ReactNode } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { FavoritesContext } from './FavoritesContext'

import type { FavoriteType, MediaType } from '../../types/FavoriteTypes'

type FavoritesProviderProps = {
  children: ReactNode
}

const FAVORITES_STORAGE_KEY = 'reviewbox:favorites'

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<FavoriteType[]>(
    FAVORITES_STORAGE_KEY,
    []
  )

  function addFavorite(favorite: FavoriteType) {
    setFavorites((prev) => {
      const alreadyExists = prev.some(
        (currentFavorite) =>
          currentFavorite.id === favorite.id &&
          currentFavorite.mediaType === favorite.mediaType
      )

      if (alreadyExists) {
        return prev
      }

      return [...prev, favorite]
    })
  }

  function removeFavorite(favoriteId: number, mediaType: MediaType) {
    setFavorites((prev) =>
      prev.filter(
        (favorite) =>
          favorite.id !== favoriteId || favorite.mediaType !== mediaType
      )
    )
  }

  function isFavorite(favoriteId: number, mediaType: MediaType) {
    return favorites.some(
      (favorite) =>
        favorite.id === favoriteId && favorite.mediaType === mediaType
    )
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