import { useContext } from 'react'
import { FavoritesContext } from '../contexts/FavoritesContext/FavoritesContext'

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites precisa estar dentro do FavoritesProvider')
  }

  return context
}