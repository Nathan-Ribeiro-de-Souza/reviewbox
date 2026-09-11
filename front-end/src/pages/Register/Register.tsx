import { useState, type SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { registerUser } from '../../services/api.ts'

export function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setIsLoading(true)

      await registerUser(
        fullName,
        email,
        password
      )

      setSuccess('Account created successfully.')

      setFullName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to create account.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="register-page">
      <div className="register-content">
        <span className="register-label">REGISTER</span>

        <section className="register-card">
          <div className="register-header">
            <h2>Create your account.</h2>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="register-name">Full Name</label>

            <input
              id="register-name"
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />

            <label htmlFor="register-email">Email</label>

            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="register-password">Password</label>

            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <label htmlFor="register-confirm-password">
              Confirm Password
            </label>

            <input
              id="register-confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            {error && (
              <p className="register-error">
                {error}
              </p>
            )}

            {success && (
              <p className="register-success">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="register-submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="register-divider">
            <span>or continue with</span>
          </div>

          <div className="register-social-buttons">
            <button type="button">Google</button>
            <button type="button">Discord</button>
            <button type="button">Apple</button>
          </div>

          <div className="register-login">
            <span>Already have an account?</span>

            <button type="button">
              <Link to='/login'>Log in</Link>
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}