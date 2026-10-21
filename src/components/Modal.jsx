// Ventana modal genérica.
// Props: isOpen (visible o no), onClose (cierra la ventana), title, children (contenido)
function Modal({ isOpen, onClose, title, children }) {
  // Si está cerrada no se renderiza nada
  if (!isOpen) return null

  return (
    // Fondo oscuro que cubre la pantalla: al hacer click fuera de la ventana, se cierra
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* stopPropagation evita que un click dentro de la ventana llegue al fondo y la cierre */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '14px',
          padding: '24px',
          minWidth: '320px',
          maxWidth: '90%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>{title}</h3>
        {/* Contenido que recibe el modal (por ejemplo, un formulario) */}
        {children}
      </div>
    </div>
  )
}

export default Modal