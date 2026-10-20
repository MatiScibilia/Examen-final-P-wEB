import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Settings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmed = window.confirm('¿Seguro que querés cerrar sesión?')
    if (!confirmed) return

    logout()
    navigate('/login')
  }

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #eee',
  }

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#4f46e5',
            color: 'white',
            fontSize: '28px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
          }}
        >
          {user ? user.name.first[0] : '?'}
        </div>
        <h1 style={{ margin: 0, fontSize: '22px' }}>
          {user ? `${user.name.first} ${user.name.last}` : 'Perfil'}
        </h1>
        <p style={{ margin: '4px 0 0', color: '#777' }}>{user ? user.username : ''}</p>
      </div>

      <div>
        <div style={rowStyle}>
          <span style={{ color: '#777' }}>Nombre</span>
          <span>{user ? user.name.first : '-'}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ color: '#777' }}>Apellido</span>
          <span>{user ? user.name.last : '-'}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ color: '#777' }}>Usuario</span>
          <span>{user ? user.username : '-'}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ color: '#777' }}>Email</span>
          <span>{user ? user.email : '-'}</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '24px',
          width: '100%',
          background: 'white',
          color: '#dc2626',
          border: '1px solid #dc2626',
          borderRadius: '8px',
          padding: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Settings