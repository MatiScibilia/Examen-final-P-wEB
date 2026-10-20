export const mockProjects = [
  {
    _id: '1',
    name: 'Proyecto 1',
    description: 'Este es mi primer proyecto',
    icon: '🚀',
  },
  {
    _id: '2',
    name: 'Proyecto 2',
    description: 'Otro proyecto de ejemplo',
    icon: '📦',
  },
  {
    _id: '3',
    name: 'Proyecto 3',
    description: 'Un tercer proyecto',
    icon: '🎯',
  },
]
export const mockEpics = [
  { _id: '1', project: '1', name: 'Epic 1', description: 'Primera épica del proyecto 1', icon: '⭐' },
  { _id: '2', project: '1', name: 'Epic 2', description: 'Segunda épica del proyecto 1', icon: '🔥' },
  { _id: '3', project: '2', name: 'Epic 3', description: 'Épica del proyecto 2', icon: '💡' },
]
export const mockStories = [
  { _id: '1', epic: '1', name: 'Story 1', description: 'Primera story de la Epic 1', status: 'todo', points: 3 },
  { _id: '2', epic: '1', name: 'Story 2', description: 'Segunda story de la Epic 1', status: 'running', points: 5 },
  { _id: '3', epic: '2', name: 'Story 3', description: 'Story de la Epic 2', status: 'done', points: 2 },
]

export const mockTasks = [
  { _id: '1', story: '1', name: 'Task 1', description: 'Primera tarea', done: true },
  { _id: '2', story: '1', name: 'Task 2', description: 'Segunda tarea', done: false },
  { _id: '3', story: '2', name: 'Task 3', description: 'Tarea de la story 2', done: false },
]
export const mockUser = {
  username: 'waltermolina',
  password: '1234',
  email: 'waltermolina@msn.com',
  name: { first: 'Walter', last: 'Molina' },
}