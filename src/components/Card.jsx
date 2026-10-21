// Tarjeta reutilizable para mostrar un elemento de una lista.
// Props: icon, title, description (contenido), onClick (abrir el detalle),
// onDelete (opcional: si se recibe, muestra el botón de eliminar)
function Card({ icon, title, description, onClick, onDelete }) {
  return (
    // Contenedor; la sombra cambia al pasar el mouse (efecto hover)
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid #eee',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.15s, transform 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)')}
    >
      {/* Zona clickeable: ícono, título y descripción. Está separada del botón
          de eliminar para que cada uno dispare su propia acción */}
      <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', flex: 1 }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: '#eef2ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: '#222' }}>{title}</div>
          <div style={{ color: '#777', fontSize: '14px' }}>{description}</div>
        </div>
      </div>

      {/* El botón de eliminar solo se muestra si se recibió onDelete */}
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#999',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '6px',
          }}
        >
          🗑️
        </button>
      )}
    </div>
  )
}

export default Card