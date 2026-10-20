import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginRequest } from '../services/api'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGeneralError('')

    const newErrors = {}
    if (!username || username.length < 4) {
      newErrors.username = 'Debe tener al menos 4 caracteres'
    }
    if (!password || password.length < 4) {
      newErrors.password = 'Debe tener al menos 4 caracteres'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      return
    }

    setLoading(true)
    try {
      const data = await loginRequest(username, password)
      login(data.user, data.token)
      navigate('/home')
    } catch (err) {
      setGeneralError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '14px',
  }

  const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444', fontWeight: 'bold' }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #4338ca, #4f46e5, #7c3aed, #a855f7)',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '-100px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          filter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-140px',
          right: '-120px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)',
          filter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'white',
          borderRadius: '16px',
          padding: '36px 32px',
          width: '100%',
          maxWidth: '380px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '32px' }}>🚀</div>
          <h1 style={{ margin: '8px 0 0', fontSize: '22px' }}>Bienvenido de nuevo</h1>
          <p style={{ margin: '4px 0 0', color: '#777', fontSize: '14px' }}>
            Ingresá tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle} htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
            {errors.username && (
              <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.username}</p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle} htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            {errors.password && (
              <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>{errors.password}</p>
            )}
          </div>

          {generalError && (
            <p style={{ color: '#dc2626', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>
              {generalError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#a5a5f0' : '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: loading ? 'default' : 'pointer',
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login