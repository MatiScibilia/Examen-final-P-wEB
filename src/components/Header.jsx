// Encabezado fijo de la aplicación.
// Props: title (texto), showBack (muestra flecha en lugar de menú),
// onMenuClick (abre el menú), onBack (vuelve a la pantalla anterior)
function Header({ title, showBack, onMenuClick, onBack }) {
  // Estilo de cada barra del ícono de menú
  const barStyle = { width: '22px', height: '2px', background: '#333', borderRadius: '2px' }

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
      {/* Un único botón: vuelve o abre el menú según showBack.
          aria-label describe el botón para lectores de pantalla */}
      <button
        onClick={showBack ? onBack : onMenuClick}
        aria-label={showBack ? 'Volver' : 'Abrir menú'}
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
        {showBack ? (
          // Ícono de flecha hacia la izquierda (SVG)
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        ) : (
          // Ícono de menú: tres barras horizontales
          <>
            <span style={barStyle} />
            <span style={barStyle} />
            <span style={barStyle} />
          </>
        )}
      </button>
      <h2 style={{ margin: 0, fontSize: '18px' }}>{title}</h2>
    </header>
  )
}

export default Header