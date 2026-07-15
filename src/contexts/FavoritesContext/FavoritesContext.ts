import { createContext } from 'react'

import type { FavoriteType } from '../../types/FavoriteTypes'

type FavoritesContextType = {
  favorites: FavoriteType[]
  addFavorite: (movie: FavoriteType) => void
  removeFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null)