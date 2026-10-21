import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

// Punto de entrada: monta la aplicación en el elemento #root de index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Habilita el enrutamiento en toda la aplicación */}
    <BrowserRouter>
      {/* Expone la sesión (user y token) a todos los componentes */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)