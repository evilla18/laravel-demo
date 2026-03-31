import { createContext, useContext, useState, useEffect } from 'react'
import api, { setToken, removeToken, getToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (token) {
      api.get('/me')
        .then((res) => setUser(res.data.data))
        .catch(() => removeToken())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password })
    setToken(res.data.data.token)
    setUser(res.data.data.user)
    return res.data
  }

  const register = async (name, email, password) => {
    const res = await api.post('/register', { name, email, password })
    setToken(res.data.data.token)
    setUser(res.data.data.user)
    return res.data
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } finally {
      removeToken()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
