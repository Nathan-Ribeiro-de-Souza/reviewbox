import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { loginUser } from '../../services/api'

import './Login.css'

export function Login() {
  const { login } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState(
    () => localStorage.getItem('rememberedEmail') || ''
  )

  const [password, setPassword] = useState(
    () => localStorage.getItem('rememberedPassword') || ''
  )

  const [rememberMe, setRememberMe] = useState(
    () => localStorage.getItem('rememberMe') === 'true'
  )

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const message = location.state?.message

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setSuccess('')

    try {
      setIsLoading(true)

      const data = await loginUser(email, password)

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email)
        localStorage.setItem('rememberedPassword', password)
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberedPassword')
        localStorage.removeItem('rememberMe')
      }

      login(data.token, data.user)

      setSuccess('Login successful.')

      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to login.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  function handlePasswordVisibility() {
    setShowPassword((prev) => !prev)
  }

  return (
    <main className="login-page">
      <div className="login-content">
        {message && (
          <p className="protected-route-message">
            {message}
          </p>
        )}

        <span className="login-label">LOGIN</span>

        <section className="login-card">
          <div className="login-header">
            <h1>Welcome back.</h1>
            <p>Log in to continue your review.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="login-email">Email</label>

            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="login-password">Password</label>

            <div className="password-input">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={handlePasswordVisibility}
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? '◉' : '◉'}
              </button>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-button"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            {success && (
              <p className="login-success">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="login-divider">
            <span>or continue with</span>
          </div>

          <div className="social-buttons">
            <button type="button">Google</button>
            <button type="button">Discord</button>
            <button type="button">Apple</button>
          </div>

          <div className="login-register">
            <span>Don't have an account?</span>

            <Link to="/register">
              Create one
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}