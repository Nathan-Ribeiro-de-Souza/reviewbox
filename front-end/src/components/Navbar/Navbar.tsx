import { NavLink } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/reviews', label: 'My Reviews' }
]

const avatarColorCount = 8

function getAvatarColorIndex(userId: number) {
  return userId % avatarColorCount
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase()
}

export function Navbar() {
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="navbar">
      <NavLink className="navbar-logo" to="/">
        ReviewBox
      </NavLink>

      <nav className="navbar-links" aria-label="Main navigation">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? 'navbar-link navbar-link-active'
                : 'navbar-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-user-area">
        {isAuthenticated && user ? (
          <NavLink
            to="/profile"
            className="navbar-profile"
            aria-label="Profile"
          >
            <span
              className={`navbar-avatar navbar-avatar-color-${getAvatarColorIndex(user.id)}`}
            >
              {getInitial(user.name)}
            </span>
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? 'navbar-link navbar-link-active'
                : 'navbar-link'
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  )
}