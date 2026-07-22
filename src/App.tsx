import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PhasePage from './pages/PhasePage'
import GlossaryPage from './pages/GlossaryPage'
import QuizPage from './pages/QuizPage'
import BlogList from './pages/BlogList'
import PlayGame from './pages/play/PlayGame'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="phase/:id" element={<PhasePage />} />
          <Route path="glossary" element={<GlossaryPage />} />
          <Route path="quiz/:phaseId" element={<QuizPage />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="play/:gameId" element={<PlayGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
