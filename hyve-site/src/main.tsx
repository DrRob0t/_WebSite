import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import './index.css'
import App from './App.tsx'
import { setupAxe } from './lib/axe-setup'
import { reportWebVitals } from './lib/web-vitals'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)

// Report web vitals
reportWebVitals()

// Setup accessibility checks in development
setupAxe()
