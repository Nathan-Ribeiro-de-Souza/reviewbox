const API_URL = 'http://localhost:3000'

function getToken() {
  return localStorage.getItem('token')
}

async function parseResponse(response: Response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Request failed.')
  }

  return data
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })

  return parseResponse(response)
}

export async function loginUser(
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  return parseResponse(response)
}

export async function getReviews() {
  const response = await fetch(`${API_URL}/reviews`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  return parseResponse(response)
}

export async function postReviews(
  mediaId: number,
  rating: number,
  comment: string,
  reviewType: string
) {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      media_id: mediaId,
      rating,
      comment,
      media_type: reviewType
    })
  })

  return parseResponse(response)
}

export async function deleteReview(reviewId: number) {
  const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  if (!response.ok) {
    const data = await response.json()

    throw new Error(data.error || 'Failed to delete review.')
  }
}

export async function editingReview(
  reviewId: number,
  newText: string,
  newRating: number
) {
  const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      comment: newText,
      rating: newRating
    })
  })

  return parseResponse(response)
}

export async function userProfile() {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  return parseResponse(response)
}

export async function getFavorites() {
  const response = await fetch(`${API_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  return parseResponse(response)
}

export async function postFavorites(
  mediaId: number,
  mediaType: string
) {
  const response = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      media_id: mediaId,
      media_type: mediaType
    })
  })

  return parseResponse(response)
}

export async function deleteFavorite(favoriteId: number) {
  const response = await fetch(
    `${API_URL}/favorites/${favoriteId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )

  return parseResponse(response)
}