// src/App.tsx - Hyve Dynamics with Header and Navigation
import { Layout } from "@/components/layout/Layout"
import { CustomMeshBackground } from "@/components/ui/CustomMeshBackground"
import { Hero } from "@/components/sections/Hero"

function App() {
  // 🎛️ EASY DISABLE: Set to false to disable mesh background
  const enableMeshBackground = true

  return (
    <Layout>
      <div className="min-h-screen relative pointer-events-none">
        <CustomMeshBackground 
          enabled={enableMeshBackground}
          className="min-h-screen pointer-events-auto"
        >
          {/* Hero section with proper pointer-events handling */}
          <Hero />
          <div className="min-h-[60vh]" />
          
        </CustomMeshBackground>
      </div>
    </Layout>
  )
}

export default App
