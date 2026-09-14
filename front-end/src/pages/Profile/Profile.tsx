import { useEffect, useState } from 'react'

import { patchNameUser, userProfile } from '../../services/api'

import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'

import './Profile.css'

type ProfileType = {
  id: number
  name: string
  email: string
  createdAt: string
  reviewCount: number
}

const avatarColors = [
  '#7C3AED',
  '#2563EB',
  '#0F766E',
  '#DB2777',
  '#EA580C',
  '#CA8A04',
  '#059669',
  '#4F46E5'
]

function getAvatarColor(userId: number) {
  return avatarColors[userId % avatarColors.length]
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase()
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

  const { logout, handleExpiredToken } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true)

        const data = await userProfile()

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
  }, [handleExpiredToken])

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

            {isEditingName ? (
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
            )}
          </div>

          <p>{profile.email}</p>
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

          <div className="profile-detail">
            <span>Email</span>
            <strong>{profile.email}</strong>
          </div>

          <div className="profile-detail">
            <span>Member since</span>
            <strong>{formatDate(profile.createdAt)}</strong>
          </div>
        </div>
      </section>

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
    </main>
  )
}