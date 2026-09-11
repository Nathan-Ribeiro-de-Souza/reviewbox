import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          message: 'You need to be logged in to access this page'
        }}
      />
    )
  }

  return <Outlet />
}