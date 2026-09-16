import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { patchNameUser, userProfile, getUserById } from '../../services/api'

import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'

import { getAvatarColor, getInitial } from '../../utils/avatar'

import './Profile.css'

type ProfileType = {
  id: number
  name: string
  email?: string
  createdAt: string
  reviewCount: number
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

export function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const { logout, handleExpiredToken, updateUser } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const { userId } = useParams()

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true)

        let data

        if (userId) {
          data = await getUserById(Number(userId))
        } else {
          data = await userProfile()
        }

        setProfile(data)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'Invalid or expired token'
        ) {
          handleExpiredToken()
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [userId, handleExpiredToken])

  if (isLoading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          <div className="profile-loading-spinner" />
          <p>Loading profile...</p>
        </div>
      </main>
    )
  }

  if (!profile) {
    return null
  }

  async function handleEditName() {
    const updatedName = await patchNameUser(newName)

    setProfile((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        name: updatedName
      }
    })

    updateUser({ name: updatedName })

    setIsEditingName(false)
  }

  function handleStartEditing() {
    if (!profile) return

    setNewName(profile.name)
    setIsEditingName(true)
  }

  const avatarColor = getAvatarColor(profile.id)

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div
          className="profile-avatar"
          style={{ backgroundColor: avatarColor }}
        >
          {getInitial(profile.name)}
        </div>

        <div className="profile-identity">
          <span className="profile-label">PROFILE</span>

          <div className="profile-name-row">
            {isEditingName ? (
              <input
                className="profile-name-input"
                type="text"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            ) : (
              <h1>{profile.name}</h1>
            )}

            {!userId &&
              (isEditingName ? (
                <button
                  type="button"
                  className="profile-edit-name-button"
                  onClick={handleEditName}
                  aria-label="Save name"
                  title="Save name"
                >
                  ✅
                </button>
              ) : (
                <button
                  type="button"
                  className="profile-edit-name-button"
                  onClick={handleStartEditing}
                  aria-label="Edit name"
                  title="Edit name"
                >
                  ✏️
                </button>
              ))}
          </div>

          {profile.email && <p>{profile.email}</p>}
        </div>
      </section>

      <section className="profile-stats">
        <article className="profile-stat">
          <span className="profile-stat-label">Reviews</span>
          <strong>{profile.reviewCount}</strong>
        </article>

        <article className="profile-stat">
          <span className="profile-stat-label">Member since</span>
          <strong>{formatDate(profile.createdAt)}</strong>
        </article>
      </section>

      <section className="profile-details">
        <div className="profile-section-header">
          <span className="profile-label">ACCOUNT</span>
          <h2>Account details</h2>
        </div>

        <div className="profile-detail-list">
          <div className="profile-detail">
            <span>Name</span>
            <strong>{profile.name}</strong>
          </div>

          {profile.email && (
            <div className="profile-detail">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
          )}

          <div className="profile-detail">
            <span>Member since</span>
            <strong>{formatDate(profile.createdAt)}</strong>
          </div>
        </div>
      </section>

      {!userId && (
        <div className="profile-actions-footer">
          <button
            type="button"
            className="profile-theme-button"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>

          <button
            type="button"
            className="profile-logout-button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </main>
  )
}