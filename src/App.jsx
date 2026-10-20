import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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

const titles = {
  '/': 'Home',
  '/home': 'Home',
  '/my-projects': 'My Projects',
  '/my-stories': 'My Stories',
  '/settings': 'Settings',
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const title = titles[location.pathname] || 'App'
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <>
      <Header title={title} onMenuClick={() => setMenuOpen(!menuOpen)} />
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