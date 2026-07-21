import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type User = { uid: string; name: string; photo?: string } | null

interface AuthContextType {
  user: User
  login: (name?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null, login: () => {}, logout: () => {},
})

const STORAGE_KEY = 'cc-auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback((name?: string) => {
    const displayName = name || prompt('名前を入力（表示名として使われます）:') || 'Student'
    setUser({ uid: `user_${Date.now()}`, name: displayName })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
