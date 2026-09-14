import { useState, type ReactNode } from 'react'

import { AuthContext, type User } from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user')

    if (!savedUser) {
      return null
    }

    try {
      return JSON.parse(savedUser) as User
    } catch {
      localStorage.removeItem('user')
      return null
    }
  })

  const isAuthenticated = token !== null

  function login(newToken: string, newUser: User) {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))

    setToken(newToken)
    setUser(newUser)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setToken(null)
    setUser(null)
  }

  function handleExpiredToken() {
    logout()
  }

  function updateUser(updatedUser: Partial<User>) {
  setUser((prev) => {
    if (!prev) return prev

    const newUser = {
      ...prev,
      ...updatedUser
    }

    localStorage.setItem('user', JSON.stringify(newUser))

    return newUser
  })
}

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        handleExpiredToken,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}