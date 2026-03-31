import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks')
      setTasks(res.data.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setCreating(true)
    try {
      const res = await api.post('/tasks', { title, description })
      setTasks([res.data.data, ...tasks])
      setTitle('')
      setDescription('')
    } finally {
      setCreating(false)
    }
  }

  const handleToggle = async (task) => {
    const res = await api.put(`/tasks/${task.id}`, {
      title: task.title,
      completed: !task.completed,
    })
    setTasks(tasks.map((t) => (t.id === task.id ? res.data.data : t)))
  }

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`)
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">TaskBoard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Hola, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Formulario crear tarea */}
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Nueva tarea</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titulo de la tarea"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripcion (opcional)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={creating}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 font-medium whitespace-nowrap"
            >
              {creating ? 'Creando...' : 'Agregar'}
            </button>
          </div>
        </form>

        {/* Lista de tareas */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando tareas...</p>
        ) : tasks.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <p className="text-gray-400 text-lg">No tenes tareas aun, crea una!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 transition ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                  className="h-5 w-5 text-indigo-600 rounded cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p
                      className={`text-sm mt-1 ${
                        task.completed ? 'line-through text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-400 hover:text-red-600 text-sm font-medium shrink-0"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
