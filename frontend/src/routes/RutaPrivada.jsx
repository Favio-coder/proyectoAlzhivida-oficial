import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function RutaPrivada({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const expiresAt = useAuthStore((state) => state.expiresAt)

  if (!isAuthenticated || (expiresAt && Date.now() > expiresAt)) {
    return <Navigate to="/login" />
  }

  return children;
}
