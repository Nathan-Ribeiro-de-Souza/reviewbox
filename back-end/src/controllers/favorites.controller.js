import {
  serviceDeleteFavorites,
  serviceGetFavorites,
  servicePostFavorites
} from '../services/favorites.service.js'

export async function controllerGetFavorites(req, res) {
  const userId = req.user.user_id

  const favorites = await serviceGetFavorites(userId)

  return res.status(200).json(favorites)
}

export async function controllerPostFavorites(req, res) {
  const userId = req.user.user_id
  const {
    media_id,
    media_type
  } = req.body

  const newFavorite = await servicePostFavorites(
    userId,
    media_id,
    media_type
  )

  return res.status(201).json(newFavorite)
}

export async function controllerDeleteFavorites(req, res) {
  const userId = req.user.user_id
  const favoriteId = req.params.id

  const deletedFavorite = await serviceDeleteFavorites(
    userId,
    favoriteId
  )

  return res.status(200).json(deletedFavorite)
}