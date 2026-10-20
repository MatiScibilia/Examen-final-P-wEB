import { useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import MyProjects from './pages/MyProjects'
import MyStories from './pages/MyStories'
import Settings from './pages/Settings'
import Login from './pages/Login'
import ProjectDetail from './pages/ProjectDetail'
import EpicDetail from './pages/EpicDetail'
import StoryDetail from './pages/StoryDetail'
import { mockProjects, mockEpics, mockStories } from './services/mocks'

const titles = {
  '/': 'Home',
  '/home': 'Home',
  '/my-projects': 'My Projects',
  '/my-stories': 'My Stories',
  '/settings': 'Settings',
}

function getDetailTitle(pathname) {
  const [, projectId, epicId, storyId] = pathname.split('/').filter(Boolean)

  const project = mockProjects.find((p) => p._id === projectId)
  const epic = mockEpics.find((e) => e._id === epicId)
  const story = mockStories.find((s) => s._id === storyId)

  if (storyId) return story ? story.name : 'Story'
  if (epicId) return project && epic ? `${project.name} > ${epic.name}` : 'Épica'
  return project ? project.name : 'Proyecto'
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isLoginPage = location.pathname === '/login'
  const isDetailPage = location.pathname.startsWith('/my-projects/')
  const title = isDetailPage
    ? getDetailTitle(location.pathname)
    : titles[location.pathname] || 'App'

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <>
      <Header
        title={title}
        showBack={isDetailPage}
        onMenuClick={() => setMenuOpen(!menuOpen)}
        onBack={() => navigate(-1)}
      />
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main style={{ padding: '16px' }}>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/my-projects" element={<PrivateRoute><MyProjects /></PrivateRoute>} />
          <Route path="/my-projects/:projectId" element={<PrivateRoute><ProjectDetail /></PrivateRoute>} />
          <Route path="/my-projects/:projectId/:epicId" element={<PrivateRoute><EpicDetail /></PrivateRoute>} />
          <Route path="/my-projects/:projectId/:epicId/:storyId" element={<PrivateRoute><StoryDetail /></PrivateRoute>} />
          <Route path="/my-stories" element={<PrivateRoute><MyStories /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        </Routes>
      </main> 
    </>
  )
}

export default App