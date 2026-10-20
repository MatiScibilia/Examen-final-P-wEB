const BASE_URL = 'https://lamansysfaketaskmanagerapi.onrender.com/api'

export async function loginRequest(username, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  const data = await response.json()

  if (data.status === 'Error' || !response.ok) {
    throw new Error(data.msg || data.message || 'Error al iniciar sesión')
  }

  return data
}

export async function getProjects(token) {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!data.success) {
    throw new Error(data.message || 'Error al obtener los proyectos')
  }

  return data.data
}