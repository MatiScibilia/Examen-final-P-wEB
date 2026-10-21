
/* Importa las herramientas para navegar, obtener el usuario y acceder a los datos de prueba. */
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { mockProjects, mockStories } from '../services/mocks'

// Componente que muestra la página principal con resúmenes y accesos a los proyectos.
function Home() {

  // Obtiene el usuario autenticado y la función para navegar entre páginas.
  const { user } = useAuth()
  const navigate = useNavigate()

  // Calcula el total de proyectos, stories pendientes, completadas y los tres proyectos recientes.
  const totalProjects = mockProjects.length
  const pendingStories = mockStories.filter((s) => s.status !== 'done').length
  const doneStories = mockStories.filter((s) => s.status === 'done').length
  const recentProjects = mockProjects.slice(0, 3)

  // Guarda los datos y colores de las tarjetas estadísticas que se mostrarán en pantalla.
  const stats = [
    { label: 'Proyectos', value: totalProjects, color: '#4f46e5' },
    { label: 'Stories pendientes', value: pendingStories, color: '#f59e0b' },
    { label: 'Stories completadas', value: doneStories, color: '#16a34a' },
  ]

  // Define los cuatro niveles de organización del trabajo con sus iconos, títulos y descripciones.
  const steps = [
    { icon: '📁', title: 'Proyecto', text: 'El nivel más alto. Agrupa todo el trabajo de una iniciativa.' },
    { icon: '⭐', title: 'Épica', text: 'Un gran bloque de trabajo dentro de un proyecto.' },
    { icon: '📝', title: 'Story', text: 'Una funcionalidad concreta dentro de una épica.' },
    { icon: '✅', title: 'Tarea', text: 'El paso más chico: lo que efectivamente se ejecuta.' },
  ]

  // Guarda los consejos que se mostrarán al usuario en la página principal.
  const tips = [
    'Podés crear, editar y eliminar proyectos, épicas, stories y tareas desde cada pantalla de detalle.',
    'Una épica o story no se puede eliminar si todavía tiene contenido adentro (stories o tareas).',
    'Desde "My Stories" podés ver todas tus stories juntas, sin entrar proyecto por proyecto.',
  ]

  // Renderiza toda la página principal, organizando sus secciones verticalmente.
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        paddingBottom: '40px',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Muestra un saludo personalizado, una descripción y un botón para ir a los proyectos. */}
      <section
        style={{
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: 'white',
          borderRadius: '16px',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '32px', margin: 0 }}>
          Hola, {user ? user.name.first : 'invitado'} 👋
        </h1>
        <p
          style={{
            fontSize: '16px',
            opacity: 0.9,
            maxWidth: '480px',
            textAlign: 'center',
            margin: '8px auto 0',
          }}
        >
          Bienvenido de nuevo. Acá tenés un resumen rápido de tus proyectos y
          el trabajo que tenés en curso.
        </p>
        <button
          onClick={() => navigate('/my-projects')}
          style={{
            marginTop: '20px',
            background: 'white',
            color: '#4f46e5',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Ver mis proyectos →
        </button>
      </section>

      {/* Recorre stats y muestra una tarjeta por cada estadística calculada. */}
      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Resumen</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                flex: '1 1 150px',
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ color: '#666', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Muestra los tres proyectos recientes y permite entrar al detalle de cada uno. */}
      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Proyectos recientes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recentProjects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/my-projects/${project._id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid #eee',
                borderRadius: '10px',
                padding: '12px 16px',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '22px' }}>{project.icon}</div>
              <div>
                <div style={{ fontWeight: 'bold' }}>{project.name}</div>
                <div style={{ color: '#666', fontSize: '14px' }}>{project.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explica la jerarquía del trabajo mostrando los elementos definidos en steps. */}
      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '8px', textAlign: 'center' }}>
          ¿Cómo se organiza el trabajo?
        </h2>
        <p
          style={{
            color: '#666',
            maxWidth: '600px',
            textAlign: 'center',
            margin: '0 auto 16px',
          }}
        >
          Esta app organiza el trabajo en 4 niveles, cada uno adentro del anterior.
          Así es más fácil ir de lo general a lo específico sin perderse.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {steps.map((step) => (
            <div
              key={step.title}
              style={{
                flex: '1 1 200px',
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '18px',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{step.icon}</div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{step.title}</div>
              <div style={{ color: '#666', fontSize: '14px' }}>{step.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recorre el array tips y muestra cada consejo en una tarjeta con un icono. */}
      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Tips</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tips.map((tip, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                background: '#f9fafb',
                borderRadius: '10px',
                padding: '14px 16px',
              }}
            >
              <span>💡</span>
              <p style={{ margin: 0, color: '#444' }}>{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Exporta el componente para poder utilizarlo en las rutas de la aplicación.
export default Home
