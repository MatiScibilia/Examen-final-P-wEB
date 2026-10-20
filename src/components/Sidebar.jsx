import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth()

  if (!isOpen) return null

  const links = [
    { to: '/home', label: 'Home', icon: '🏠' },
    { to: '/my-projects', label: 'My Projects', icon: '📁' },
    { to: '/my-stories', label: 'My Stories', icon: '📝' },
  ]

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: isActive ? '#4f46e5' : '#333',
    background: isActive ? '#eef2ff' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
  })

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.3)',
        zIndex: 90,
      }}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '240px',
          height: '100%',
          background: '#fff',
          borderRight: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 12px',
          fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0 8px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '22px' }}>🚀</span>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Task Tracker</span>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} style={linkStyle} onClick={onClose}>
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/settings"
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 8px',
            borderTop: '1px solid #eee',
            textDecoration: 'none',
            color: isActive ? '#4f46e5' : '#333',
          })}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#4f46e5',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              flexShrink: 0,
            }}
          >
            {user ? user.name.first[0] : '?'}
          </div>
          <span>{user ? `${user.name.first} ${user.name.last}` : 'Perfil'}</span>
        </NavLink>
      </aside>
    </div>
  )
}

export default Sidebar