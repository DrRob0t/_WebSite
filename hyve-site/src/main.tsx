import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import './index.css'
import App from './App.tsx'
import { setupAxe } from './lib/axe-setup'
import { reportWebVitals } from './lib/web-vitals'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Toaster 
        position="top-center"
        toastOptions={{
          classNames: {
            toast: 'bg-white border-gray-200 shadow-lg',
            title: 'text-gray-900 font-medium',
            description: 'text-gray-600',
            success: 'bg-green-50 border-green-200',
            error: 'bg-red-50 border-red-200',
            warning: 'bg-yellow-50 border-yellow-200',
            info: 'bg-blue-50 border-blue-200',
          },
        }}
        richColors
        closeButton
      />
    </HelmetProvider>
  </StrictMode>
)

// Report web vitals
reportWebVitals()

// Setup accessibility checks in development
setupAxe()
