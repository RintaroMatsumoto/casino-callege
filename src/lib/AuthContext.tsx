import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type User = { uid: string; name: string; email: string; photo?: string } | null

interface AuthContextType {
  user: User
  login: () => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null, login: () => {}, logout: () => {}, loading: false,
})

const STORAGE_KEY = 'cc-auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)

  // Persist user changes
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback(() => {
    setLoading(true)
    // Try Firebase first, fall back to demo login
    import('./firebase').then(async ({ firebaseConfig }) => {
      if (firebaseConfig.apiKey) {
        try {
          const { initializeApp } = await import('firebase/app')
          const { getAuth, signInWithPopup, GoogleAuthProvider } = await import('firebase/auth')
          const app = initializeApp(firebaseConfig)
          const auth = getAuth(app)
          const result = await signInWithPopup(auth, new GoogleAuthProvider())
          const u = result.user
          setUser({ uid: u.uid, name: u.displayName || '', email: u.email || '', photo: u.photoURL || undefined })
        } catch {
          fallback()
        }
      } else {
        fallback()
      }
      setLoading(false)
    }).catch(() => { fallback(); setLoading(false) })
  }, [])

  const fallback = useCallback(() => {
    const name = prompt('名前を入力（デモモード）:') || 'Student'
    setUser({ uid: `demo_${Date.now()}`, name, email: `${name}@demo.local` })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
