import { createRoot } from 'react-dom/client'
import '@/index.css'
import { initTheme } from '@/design-system'
import { DocsApp } from './DocsApp'

initTheme()
createRoot(document.getElementById('root')!).render(<DocsApp />)
