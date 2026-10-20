import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import { mockStories, mockTasks } from '../services/mocks'

function StoryDetail() {
  const { storyId } = useParams()

  const story = mockStories.find((s) => s._id === storyId)
  const [tasks, setTasks] = useState(mockTasks.filter((t) => t.story === storyId))

  const [modalOpen, setModalOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [error, setError] = useState('')

  if (!story) {
    return <p>Story no encontrada.</p>
  }

  const handleCreateTask = (e) => {
    e.preventDefault()
    setError('')

    if (!taskName) {
      setError('El nombre es obligatorio')
      return
    }
    if (taskDescription && taskDescription.length < 10) {
      setError('La descripción, si se provee, requiere al menos 10 caracteres')
      return
    }

    const newTask = { _id: String(Date.now()), story: storyId, name: taskName, description: taskDescription, done: false }
    setTasks([...tasks, newTask])
    setTaskName('')
    setTaskDescription('')
    setModalOpen(false)
  }

  const handleDeleteTask = (task) => {
    const confirmed = window.confirm(`¿Seguro que querés eliminar "${task.name}"?`)
    if (!confirmed) return
    setTasks(tasks.filter((t) => t._id !== task._id))
  }

  const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }
  const buttonStyle = { background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 18px', fontWeight: 'bold', cursor: 'pointer' }

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>{story.name}</h1>
        <p style={{ margin: '6px 0 16px', color: '#777', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          {story.description}
        </p>
        <button onClick={() => setModalOpen(true)} style={buttonStyle}>+ Nueva tarea</button>
      </div>

      {tasks.length === 0 ? (
        <p style={{ color: '#777', textAlign: 'center' }}>Esta story no tiene tareas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '10px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <input
                id={`task-done-${task._id}`}
                type="checkbox"
                checked={task.done}
                readOnly
                style={{ width: '18px', height: '18px', marginTop: '3px' }}
              />
              <label htmlFor={`task-done-${task._id}`} style={{ flex: 1, cursor: 'default' }}>
                <div style={{ fontWeight: 'bold', color: '#222' }}>{task.name}</div>
                <div style={{ color: '#777', fontSize: '14px' }}>{task.description}</div>
              </label>
              <button
                onClick={() => handleDeleteTask(task)}
                style={{ border: 'none', background: 'transparent', color: '#999', cursor: 'pointer', fontSize: '16px' }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nueva tarea">
        <form onSubmit={handleCreateTask}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="task-name" style={labelStyle}>Nombre</label>
            <input id="task-name" type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="task-description" style={labelStyle}>Descripción</label>
            <textarea id="task-description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} style={inputStyle} />
          </div>
          {error && <p style={{ color: '#dc2626', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
          <button type="submit" style={buttonStyle}>Crear</button>
        </form>
      </Modal>
    </div>
  )
}

export default StoryDetail