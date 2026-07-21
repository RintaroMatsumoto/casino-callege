const API_BASE = '/api'

export async function getCounter(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/counter`)
    const data = await res.json()
    return data.count
  } catch {
    const stored = localStorage.getItem('cc-counter')
    return stored ? parseInt(stored) : 0
  }
}

export async function incrementCounter(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/counter`, { method: 'POST' })
    const data = await res.json()
    localStorage.setItem('cc-counter', String(data.count))
    return data.count
  } catch {
    const stored = parseInt(localStorage.getItem('cc-counter') || '0')
    const newCount = stored + 1
    localStorage.setItem('cc-counter', String(newCount))
    return newCount
  }
}

export interface ProgressData {
  data: string
  lastVisit: string
  streak: number
}

export async function getProgress(userId: string): Promise<ProgressData> {
  try {
    const res = await fetch(`${API_BASE}/progress?userId=${encodeURIComponent(userId)}`)
    return await res.json()
  } catch {
    const stored = localStorage.getItem(`cc-progress-data-${userId}`)
    return stored ? JSON.parse(stored) : { data: '{}', lastVisit: '', streak: 0 }
  }
}

export async function saveProgress(userId: string, progress: ProgressData): Promise<void> {
  try {
    await fetch(`${API_BASE}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress),
    })
  } catch {
    localStorage.setItem(`cc-progress-data-${userId}`, JSON.stringify(progress))
  }
}
