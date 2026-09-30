import { createRoot } from 'react-dom/client'
import '@/index.css'
import '@/i18n/i18n'
import './i18n/docs.i18n'
import { initTheme } from '@/design-system'
import { DocsApp } from './DocsApp'

initTheme()
createRoot(document.getElementById('root')!).render(<DocsApp />)
