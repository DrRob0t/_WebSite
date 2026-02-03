// src/App.tsx - Hyve Dynamics with Header and Navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { SEO } from '@/components/common/SEO'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { Industries } from '@/components/sections/Industries'
import { Vision } from '@/components/sections/Vision'
import { CustomMeshBackground } from '@/components/ui/CustomMeshBackground'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { AboutPage } from '@/pages/AboutPage'
import { HapticMatrixPage } from '@/pages/HapticMatrixPage'
import { AerospacePage } from '@/pages/industries/AerospacePage'
import { AutomotivePage } from '@/pages/industries/AutomotivePage'
import { EnergyPage } from '@/pages/industries/EnergyPage'
import { RoboticsPage } from '@/pages/industries/RoboticsPage'
import { StructuralHealthPage } from '@/pages/industries/StructuralHealthPage'
import { NotFound } from '@/pages/NotFound'
import { NewsletterPage } from '@/pages/NewsletterPage'
import { NewsPage } from '@/pages/NewsPage'
import { AerodynamicInnovation2024 } from '@/pages/newsletters/AerodynamicInnovation2024'
import { SensorTechnologyTrends } from '@/pages/newsletters/SensorTechnologyTrends'
import { InvestorUpdateAugust2025 } from '@/pages/newsletters/InvestorUpdateAugust2025'

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

          {/* Spacing between Hero and Vision */}
          <div className="h-36 md:h-28 lg:h-32" />

          {/* Vision section */}
          <Vision />

          {/* Spacing between Vision and Industries */}
          <div className="h-36 md:h-28 lg:h-32" />

          {/* Industries section */}
          <Industries />

          {/* Footer spacing */}
          <div className="h-28 md:h-32" />
        </CustomMeshBackground>
      </div>
    </>
  )
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
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
            
            {/* Insights Routes */}
            <Route path="/insights/news" element={<NewsPage />} />
            <Route path="/insights/newsletter" element={<NewsletterPage />} />
            <Route path="/insights/newsletter/aerodynamic-innovation-2024" element={<AerodynamicInnovation2024 />} />
            <Route path="/insights/newsletter/sensor-technology-trends" element={<SensorTechnologyTrends />} />
            
            {/* Secret Investor Newsletter - Not indexed */}
            <Route path="/investor/updates/august-2025" element={<InvestorUpdateAugust2025 />} />
            
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        <ScrollToTop showAfter={400} />
      </Layout>
    </Router>
  )
}

export default App
