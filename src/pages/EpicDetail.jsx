import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { mockEpics, mockStories, mockTasks } from '../services/mocks'

function EpicDetail() {
  const { projectId, epicId } = useParams()
  const navigate = useNavigate()

  const [epic, setEpic] = useState(mockEpics.find((e) => e._id === epicId))
  const [stories, setStories] = useState(mockStories.filter((s) => s.epic === epicId))

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [name, setName] = useState(epic ? epic.name : '')
  const [description, setDescription] = useState(epic ? epic.description : '')

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [storyName, setStoryName] = useState('')
  const [storyDescription, setStoryDescription] = useState('')

  if (!epic) {
    return <p>Épica no encontrada.</p>
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setEpic({ ...epic, name, description })
    setEditModalOpen(false)
  }

  const openEditModal = () => {
    setName(epic.name)
    setDescription(epic.description)
    setEditModalOpen(true)
  }

  const handleCreateStory = (e) => {
    e.preventDefault()
    const newStory = { _id: String(Date.now()), epic: epicId, name: storyName, description: storyDescription, status: 'todo' }
    setStories([...stories, newStory])
    setStoryName('')
    setStoryDescription('')
    setCreateModalOpen(false)
  }

  const handleDeleteStory = (story) => {
    const hasTasks = mockTasks.some((t) => t.story === story._id)
    if (hasTasks) {
      alert('No se puede eliminar una story que tiene tareas.')
      return
    }
    const confirmed = window.confirm(`¿Seguro que querés eliminar "${story.name}"?`)
    if (!confirmed) return
    setStories(stories.filter((s) => s._id !== story._id))
  }

  const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }
  const buttonStyle = { background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', fontWeight: 'bold', cursor: 'pointer' }
  const secondaryButtonStyle = { background: 'white', color: '#4f46e5', border: '1px solid #4f46e5', borderRadius: '8px', padding: '10px 18px', fontWeight: 'bold', cursor: 'pointer' }

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>{epic.name}</h1>
        <p style={{ margin: '6px 0 16px', color: '#777', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          {epic.description}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={openEditModal} style={secondaryButtonStyle}>Editar épica</button>
          <button onClick={() => setCreateModalOpen(true)} style={buttonStyle}>+ Nueva story</button>
        </div>
      </div>

      {stories.length === 0 ? (
        <p style={{ color: '#777', textAlign: 'center' }}>Esta épica no tiene stories.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {stories.map((story) => (
            <li key={story._id}>
              <Card
                icon="📝"
                title={story.name}
                description={story.description}
                onClick={() => navigate(`/my-projects/${projectId}/${epicId}/${story._id}`)}
                onDelete={() => handleDeleteStory(story)}
              />
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Editar épica">
        <form onSubmit={handleEdit}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="epic-edit-name" style={labelStyle}>Nombre</label>
            <input id="epic-edit-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="epic-edit-description" style={labelStyle}>Descripción</label>
            <textarea id="epic-edit-description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>Guardar cambios</button>
        </form>
      </Modal>

      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Nueva story">
        <form onSubmit={handleCreateStory}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="story-name" style={labelStyle}>Nombre</label>
            <input id="story-name" type="text" value={storyName} onChange={(e) => setStoryName(e.target.value)} required style={inputStyle} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="story-description" style={labelStyle}>Descripción</label>
            <textarea id="story-description" value={storyDescription} onChange={(e) => setStoryDescription(e.target.value)} style={inputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>Crear</button>
        </form>
      </Modal>
    </div>
  )
}

export default EpicDetail