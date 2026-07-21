import { useAuth } from '../lib/AuthContext'
import { LogIn, LogOut, User } from 'lucide-react'

export default function LoginButton() {
  const { user, login, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-casino-card border border-casino-border flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-casino-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <span className="text-xs text-white font-medium leading-tight">{user.name}</span>
          <span className="text-[9px] text-casino-muted">{user.email}</span>
        </div>
        {user.photo ? (
          <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full border border-casino-border object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-casino-gold/30 to-yellow-600/30 border border-casino-gold/20 flex items-center justify-center">
            <User size={14} className="text-casino-gold" />
          </div>
        )}
        <button onClick={logout} className="p-1.5 rounded-lg hover:bg-casino-card/50 text-casino-muted hover:text-red-400 transition-colors" title="Logout">
          <LogOut size={14} />
        </button>
      </div>
    )
  }

  return (
    <button onClick={login} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-casino-border text-sm text-casino-muted hover:text-white transition-colors">
      <LogIn size={14} />
      Sign in with Google
    </button>
  )
}
