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

// Títulos del Header para las rutas fijas
const titles = {
  '/': 'Home',
  '/home': 'Home',
  '/my-projects': 'My Projects',
  '/my-stories': 'My Stories',
  '/settings': 'Settings',
}

// Genera el título del Header para las pantallas de detalle a partir de la URL
function getDetailTitle(pathname) {
  // Segmentos de la URL: '/my-projects/1/2' → ['my-projects', '1', '2'].
  // El primer segmento se descarta y el resto se asigna por posición
  const [, projectId, epicId, storyId] = pathname.split('/').filter(Boolean)

  // Busca cada entidad por id (undefined si no existe)
  const project = mockProjects.find((p) => p._id === projectId)
  const epic = mockEpics.find((e) => e._id === epicId)
  const story = mockStories.find((s) => s._id === storyId)

  // El título corresponde al nivel más profundo presente en la URL
  if (storyId) return story ? story.name : 'Story'
  if (epicId) return project && epic ? `${project.name} > ${epic.name}` : 'Épica'
  return project ? project.name : 'Proyecto'
}

function App() {
  // Estado del menú lateral (abierto o cerrado)
  const [menuOpen, setMenuOpen] = useState(false)

  // Ruta actual y función para navegar desde el código
  const location = useLocation()
  const navigate = useNavigate()

  // Indicadores de la ruta actual
  const isLoginPage = location.pathname === '/login'
  const isDetailPage = location.pathname.startsWith('/my-projects/')

  // Detalle: título calculado; resto: título fijo, con 'App' como valor por defecto
  const title = isDetailPage
    ? getDetailTitle(location.pathname)
    : titles[location.pathname] || 'App'

  // En /login se renderiza solo el Login, sin Header ni Sidebar
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <>
      {/* Header: botón de volver en las pantallas de detalle, botón de menú en el resto */}
      <Header
        title={title}
        showBack={isDetailPage}
        onMenuClick={() => setMenuOpen(!menuOpen)}
        onBack={() => navigate(-1)}
      />

      {/* Menú lateral: visible cuando menuOpen es true */}
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Contenido principal: cada ruta renderiza su página; PrivateRoute exige sesión iniciada */}
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