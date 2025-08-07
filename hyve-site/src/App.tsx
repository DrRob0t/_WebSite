// src/App.tsx - Hyve Dynamics with Header and Navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { SEO } from '@/components/common/SEO'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { Industries } from '@/components/sections/Industries'
import { Vision } from '@/components/sections/Vision'
import { CustomMeshBackground } from '@/components/ui/CustomMeshBackground'
import { AboutPage } from '@/pages/AboutPage'
import { HapticMatrixPage } from '@/pages/HapticMatrixPage'
import { AerospacePage } from '@/pages/industries/AerospacePage'
import { AutomotivePage } from '@/pages/industries/AutomotivePage'
import { EnergyPage } from '@/pages/industries/EnergyPage'
import { RoboticsPage } from '@/pages/industries/RoboticsPage'
import { StructuralHealthPage } from '@/pages/industries/StructuralHealthPage'
import { NotFound } from '@/pages/NotFound'

// Home page component
const HomePage = () => {
  const enableMeshBackground = true

  return (
    <>
      <SEO />
      <div className="min-h-screen relative pointer-events-none">
        <CustomMeshBackground
          enabled={enableMeshBackground}
          className="min-h-screen pointer-events-auto"
        >
          {/* Hero section with proper pointer-events handling */}
          <Hero />

          {/* Vision section */}
          <Vision />

          {/* Industries section */}
          <Industries />

          {/* Footer spacing */}
          <div className="h-24" />
        </CustomMeshBackground>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/haptic-matrix" element={<HapticMatrixPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/industries/aerospace" element={<AerospacePage />} />
            <Route path="/industries/automotive" element={<AutomotivePage />} />
            <Route path="/industries/energy" element={<EnergyPage />} />
            <Route path="/industries/structural-health" element={<StructuralHealthPage />} />
            <Route path="/industries/robotics" element={<RoboticsPage />} />
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </Router>
  )
}

export default App
