import {
  type ReactNode,
  useEffect,
  useState
} from 'react'

import { useNavigate } from 'react-router-dom'

import {
  deleteFavorite,
  getFavorites,
  postFavorites
} from '../../services/api'

import { useAuth } from '../../hooks/useAuth'

import type {
  FavoriteType,
  MediaType
} from '../../types/FavoriteTypes'

import { FavoritesContext } from './FavoritesContext'

type FavoritesProviderProps = {
  children: ReactNode
}

export function FavoritesProvider({
  children
}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteType[]>([])

  const {
    isAuthenticated,
    handleExpiredToken
  } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    async function loadFavorites() {
      try {
        const data = await getFavorites()

        setFavorites(data)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'Invalid or expired token'
        ) {
          handleExpiredToken()
        }
      }
    }

    loadFavorites()
  }, [handleExpiredToken])

  async function addFavorite(favorite: FavoriteType) {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          message: 'You need to be logged in to access a Favorite'
        }
      })

      return
    }

    try {
      const newFavorite = await postFavorites(
        favorite.mediaId,
        favorite.mediaType
      )

      setFavorites((prev) => [
        ...prev,
        {
          ...favorite,
          ...newFavorite
        }
      ])
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Invalid or expired token'
      ) {
        handleExpiredToken()
      }

      throw error
    }
  }

  async function removeFavorite(favoriteId: number) {
    try {
      await deleteFavorite(favoriteId)

      setFavorites((prev) =>
        prev.filter(
          (favorite) => favorite.id !== favoriteId
        )
      )
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Invalid or expired token'
      ) {
        handleExpiredToken()
      }

      throw error
    }
  }

  function isFavorite(
    mediaId: number,
    mediaType: MediaType
  ) {
    return favorites.some(
      (favorite) =>
        favorite.mediaId === mediaId &&
        favorite.mediaType === mediaType
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