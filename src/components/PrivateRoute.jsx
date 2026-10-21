import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Protege una ruta: solo renderiza su contenido si hay un usuario con sesión iniciada
function PrivateRoute({ children }) {
  const { user } = useAuth()

  // Sin sesión: redirige al login
  if (!user) {
    return <Navigate to="/login" />
  }

  // Con sesión: renderiza la página protegida
  return children
}

export default PrivateRoute