import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { mockProjects, mockEpics } from '../services/mocks'

function MyProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreate = (e) => {
    e.preventDefault()
    const newProject = { _id: String(Date.now()), name, description, icon: '📁' }
    setProjects([...projects, newProject])
    setName('')
    setDescription('')
    setModalOpen(false)
  }

  const handleDelete = (project) => {
    const hasEpics = mockEpics.some((e) => e.project === project._id)
    if (hasEpics) {
      alert('No se puede eliminar un proyecto que tiene épicas.')
      return
    }
    const confirmed = window.confirm(`¿Seguro que querés eliminar "${project.name}"?`)
    if (!confirmed) return
    setProjects(projects.filter((p) => p._id !== project._id))
  }

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>My Projects</h1>
        <p style={{ margin: '6px 0 16px', color: '#777' }}>Todos tus proyectos en un solo lugar.</p>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            background: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 18px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          + Nuevo proyecto
        </button>
      </div>

      {loading ? (
        <p style={{ color: '#777' }}>Cargando proyectos...</p>
      ) : projects.length === 0 ? (
        <p style={{ color: '#777' }}>No tenés proyectos asignados.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {projects.map((project) => (
            <li key={project._id}>
              <Card
                icon={project.icon}
                title={project.name}
                description={project.description}
                onClick={() => navigate(`/my-projects/${project._id}`)}
                onDelete={() => handleDelete(project)}
              />
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo proyecto">
        <form onSubmit={handleCreate}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="project-name" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }}>Nombre</label>
            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="project-description" style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }}>Descripción</label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            style={{ background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Crear
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default MyProjects