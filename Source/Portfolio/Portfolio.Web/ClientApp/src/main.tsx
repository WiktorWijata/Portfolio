import { createRoot } from 'react-dom/client'
import './index.css'
import { initTheme } from '@/design-system'
import { App } from './App.tsx'

initTheme()
createRoot(document.getElementById('root')!).render(<App />)
