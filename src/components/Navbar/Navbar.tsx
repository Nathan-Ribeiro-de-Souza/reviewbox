import { NavLink } from 'react-router-dom'

import { useTheme } from '../../hooks/useTheme'

import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/reviews', label: 'My Reviews' }
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

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
              isActive ? 'navbar-link navbar-link-active' : 'navbar-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="navbar-theme-button"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </header>
  )
}