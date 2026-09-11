import { createContext } from 'react'

import type {
  FavoriteType,
  MediaType
} from '../../types/FavoriteTypes'

type FavoritesContextType = {
  favorites: FavoriteType[]
  addFavorite: (favorite: FavoriteType) => void
  removeFavorite: (favoriteId: number) => void
  isFavorite: (mediaId: number, mediaType: MediaType) => boolean
}

export const FavoritesContext =
  createContext<FavoritesContextType | null>(null)