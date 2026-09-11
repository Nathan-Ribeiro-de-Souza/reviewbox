import {
  ConflictError,
  NotFoundError,
  ValidationError
} from '../errors/errors.js'

import {
  deleteFavorite,
  getFavorites,
  postFavorites
} from '../repositories/favorites.repository.js'

export async function serviceGetFavorites(userId) {
  const favorites = await getFavorites(userId)

  const favoritesWithMovieData = await Promise.all(
    favorites.map(async (favorite) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${favorite.mediaId}?api_key=${process.env.TMDB_API_KEY}`
      )

      if (!response.ok) {
        throw new Error('Failed to load movie from TMDB')
      }

      const data = await response.json()

      return {
        id: favorite.id,
        mediaId: favorite.mediaId,
        title: data.title,
        poster_path: data.poster_path,
        release_date: data.release_date,
        vote_average: data.vote_average,
        mediaType: favorite.mediaType
      }
    })
  )

  return favoritesWithMovieData
}

export async function servicePostFavorites(
  userId,
  mediaId,
  mediaType
) {
  if (!Number.isInteger(mediaId) || mediaId <= 0) {
    throw new ValidationError('Invalid media id')
  }

  if (mediaType !== 'movies' && mediaType !== 'series') {
    throw new ValidationError('Invalid media type')
  }

  try {
    return await postFavorites(
      userId,
      mediaId,
      mediaType
    )
  } catch (error) {
    if (error.code === '23505') {
      throw new ConflictError('Media already exists')
    }

    throw error
  }
}

export async function serviceDeleteFavorites(
  userId,
  favoriteId
) {
  const id = Number(favoriteId)

  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError('Invalid favorite id')
  }

  const deletedFavorite = await deleteFavorite(
    userId,
    id
  )

  if (!deletedFavorite) {
    throw new NotFoundError('Favorite not found')
  }

  return deletedFavorite
}