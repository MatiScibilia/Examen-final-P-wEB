import { createContext, useContext, useState } from 'react'

// Contexto de autenticación: comparte la sesión con toda la aplicación
const AuthContext = createContext(null)

// Recupera la sesión guardada en localStorage; devuelve {} si no existe o no es válida
function getSavedSession() {
  try {
    return JSON.parse(localStorage.getItem('session')) || {}
  } catch {
    return {}
  }
}

// Provider: almacena el usuario y el token, y los expone a los componentes hijos
export function AuthProvider({ children }) {
  // El estado inicial se toma de localStorage para mantener la sesión al recargar
  const [user, setUser] = useState(() => getSavedSession().user || null)
  const [token, setToken] = useState(() => getSavedSession().token || null)

  // Guarda la sesión en el estado y en localStorage
  const login = (userData, jwt) => {
    localStorage.setItem('session', JSON.stringify({ user: userData, token: jwt }))
    setUser(userData)
    setToken(jwt)
  }

  // Elimina la sesión del estado y de localStorage
  const logout = () => {
    localStorage.removeItem('session')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para consumir el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext)
}