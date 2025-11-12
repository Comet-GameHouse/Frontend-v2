import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@hooks'
import type { Role } from '@app-types'

type ProtectedRouteProps = {
  redirectTo?: string
  allowedRoles?: Role[]
}

function ProtectedRoute({ redirectTo = '/auth/signin', allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute

