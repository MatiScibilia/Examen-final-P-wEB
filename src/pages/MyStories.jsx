import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { mockStories, mockEpics } from '../services/mocks'

function MyStories() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '26px' }}>My Stories</h1>
        <p style={{ margin: '6px 0 0', color: '#777' }}>Todas tus stories, de todos los proyectos.</p>
      </div>

      {mockStories.length === 0 ? (
        <p style={{ color: '#777', textAlign: 'center' }}>No tenés stories asignadas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {mockStories.map((story) => {
            const epic = mockEpics.find((e) => e._id === story.epic)
            const projectId = epic ? epic.project : null

            return (
              <li key={story._id}>
                <Card
                  icon="📝"
                  title={story.name}
                  description={`${story.description} (${story.status})`}
                  onClick={() => navigate(`/my-projects/${projectId}/${story.epic}/${story._id}`)}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default MyStories