
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { mockProjects, mockEpics, mockStories } from '../services/mocks'

// Componente que muestra un proyecto y permite editarlo, crear épicas o eliminarlas.
function ProjectDetail() {
  // Obtiene el ID del proyecto desde la URL y permite navegar a otras pantallas.
  const { projectId } = useParams()
  const navigate = useNavigate()

  // Busca el proyecto y sus épicas correspondientes para mostrarlos en pantalla.
  const [project, setProject] = useState(mockProjects.find((p) => p._id === projectId))
  const [epics, setEpics] = useState(mockEpics.filter((e) => e.project === projectId))

  // Estados para controlar el modal de edición y los datos del proyecto.
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [name, setName] = useState(project ? project.name : '')
  const [description, setDescription] = useState(project ? project.description : '')

  // Estados para controlar el modal de creación y los datos de la nueva épica.
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [epicName, setEpicName] = useState('')
  const [epicDescription, setEpicDescription] = useState('')

  // Si el ID no corresponde a ningún proyecto, muestra un mensaje y termina el componente.
  if (!project) {
    return <p>Proyecto no encontrado.</p>
  }

  // Guarda los cambios del proyecto y cierra el modal de edición.
  const handleEdit = (e) => {
    e.preventDefault()
    setProject({ ...project, name, description })
    setEditModalOpen(false)
  }

  // Carga los datos actuales del proyecto en el formulario antes de abrir el modal.
  const openEditModal = () => {
    setName(project.name)
    setDescription(project.description)
    setEditModalOpen(true)
  }

  // Crea una épica nueva, la agrega a la lista y limpia y cierra el formulario.
  const handleCreateEpic = (e) => {
    e.preventDefault()
    const newEpic = { _id: String(Date.now()), project: projectId, name: epicName, description: epicDescription, icon: '⭐' }
    setEpics([...epics, newEpic])
    setEpicName('')
    setEpicDescription('')
    setCreateModalOpen(false)
  }

  // Impide eliminar épicas que tengan stories y pide confirmación para las demás.
  const handleDeleteEpic = (epic) => {
    const hasStories = mockStories.some((s) => s.epic === epic._id)
    if (hasStories) {
      alert('No se puede eliminar una épica que tiene stories.')
      return
    }
    const confirmed = window.confirm(`¿Seguro que querés eliminar "${epic.name}"?`)
    if (!confirmed) return
    setEpics(epics.filter((e) => e._id !== epic._id))
  }

  // Estilos reutilizables para los campos, las etiquetas y los botones de los formularios.
  const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }
  const buttonStyle = { background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', fontWeight: 'bold', cursor: 'pointer' }
  const secondaryButtonStyle = { background: 'white', color: '#4f46e5', border: '1px solid #4f46e5', borderRadius: '8px', padding: '10px 18px', fontWeight: 'bold', cursor: 'pointer' }

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Encabezado con el nombre, la descripción y los botones de acciones del proyecto. */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>{project.name}</h1>
        <p style={{ margin: '6px 0 16px', color: '#777', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={openEditModal} style={secondaryButtonStyle}>Editar proyecto</button>
          <button onClick={() => setCreateModalOpen(true)} style={buttonStyle}>+ Nueva épica</button>
        </div>
      </div>

      {/* Muestra un mensaje si no hay épicas o crea una tarjeta por cada épica del proyecto. */}
      {epics.length === 0 ? (
        <p style={{ color: '#777', textAlign: 'center' }}>Este proyecto no tiene épicas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {epics.map((epic) => (
            <li key={epic._id}>
              <Card
                icon={epic.icon}
                title={epic.name}
                description={epic.description}
                onClick={() => navigate(`/my-projects/${projectId}/${epic._id}`)}
                onDelete={() => handleDeleteEpic(epic)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Modal con el formulario para editar el nombre y la descripción del proyecto. */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Editar proyecto">
        <form onSubmit={handleEdit}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="project-edit-name" style={labelStyle}>Nombre</label>
            <input id="project-edit-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="project-edit-description" style={labelStyle}>Descripción</label>
            <textarea id="project-edit-description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>Guardar cambios</button>
        </form>
      </Modal>

      {/* Modal con el formulario para crear una épica nueva. */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Nueva épica">
        <form onSubmit={handleCreateEpic}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="epic-name" style={labelStyle}>Nombre</label>
            <input id="epic-name" type="text" value={epicName} onChange={(e) => setEpicName(e.target.value)} required style={inputStyle} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="epic-description" style={labelStyle}>Descripción</label>
            <textarea id="epic-description" value={epicDescription} onChange={(e) => setEpicDescription(e.target.value)} style={inputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>Crear</button>
        </form>
      </Modal>
    </div>
  )
}

export default ProjectDetail
