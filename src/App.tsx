import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PhasePage from './pages/PhasePage'
import GlossaryPage from './pages/GlossaryPage'
import QuizPage from './pages/QuizPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="phase/:id" element={<PhasePage />} />
            <Route path="glossary" element={<GlossaryPage />} />
            <Route path="quiz/:phaseId" element={<QuizPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
