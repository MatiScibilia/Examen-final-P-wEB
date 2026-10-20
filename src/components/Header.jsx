function Header({ title, onMenuClick }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 20px',
        borderBottom: '1px solid #eee',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <button
        onClick={onMenuClick}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <span style={{ width: '22px', height: '2px', background: '#333', borderRadius: '2px' }} />
        <span style={{ width: '22px', height: '2px', background: '#333', borderRadius: '2px' }} />
        <span style={{ width: '22px', height: '2px', background: '#333', borderRadius: '2px' }} />
      </button>
      <h2 style={{ margin: 0, fontSize: '18px' }}>{title}</h2>
    </header>
  )
}

export default Header