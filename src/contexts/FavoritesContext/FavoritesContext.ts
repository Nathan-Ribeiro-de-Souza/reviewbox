import { createContext } from 'react'

import type { FavoritesType } from '../../types/FavoriteTypes'

type FavoritesContextType = {
  favorites: FavoritesType[]
  addFavorite: (movie: FavoritesType) => void
  removeFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null)